<?php
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

// Preflight CORS
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'error' => 'Method Not Allowed']);
    exit;
}

// Read raw JSON input
$raw = file_get_contents('php://input');
$data = json_decode($raw, true);

if (!$data || !is_array($data)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Invalid JSON payload received']);
    exit;
}

// Default admin password (fixed, single credential)
$ADMIN_PASS = 'techno-temple';

// Check if a custom password was saved
$passFile = __DIR__ . '/.admin_secret';
if (file_exists($passFile)) {
    $stored = trim(file_get_contents($passFile));
    if (!empty($stored)) {
        $ADMIN_PASS = $stored;
    }
}

// Authenticate request
$password = isset($data['password']) ? trim($data['password']) : '';
if ($password !== $ADMIN_PASS) {
    http_response_code(401);
    echo json_encode(['success' => false, 'error' => 'Unauthorized: Incorrect password']);
    exit;
}

// Action 1: Change password
if (isset($data['action']) && $data['action'] === 'change_password') {
    $newPass = trim($data['newPassword'] ?? '');
    if (strlen($newPass) < 6) {
        http_response_code(400);
        echo json_encode(['success' => false, 'error' => 'New password must be at least 6 characters']);
        exit;
    }
    file_put_contents($passFile, $newPass);
    echo json_encode(['success' => true, 'message' => 'Admin password updated successfully']);
    exit;
}

// Action 2: Image upload (base64 string directly saved to /images/custom/)
if (isset($data['action']) && $data['action'] === 'upload_image') {
    $base64 = $data['base64'] ?? '';
    $rawName = $data['filename'] ?? 'room_' . time() . '.jpg';
    $ext = pathinfo($rawName, PATHINFO_EXTENSION);
    if (!in_array(strtolower($ext), ['jpg', 'jpeg', 'png', 'webp'])) {
        $ext = 'jpg';
    }
    $cleanName = 'room_' . time() . '_' . substr(md5(uniqid()), 0, 6) . '.' . $ext;

    if (strpos($base64, ',') !== false) {
        $base64 = explode(',', $base64)[1];
    }
    $decoded = base64_decode($base64);
    if ($decoded === false) {
        http_response_code(400);
        echo json_encode(['success' => false, 'error' => 'Failed to decode image']);
        exit;
    }

    $uploadDir = dirname(__DIR__) . '/images/custom/';
    if (!is_dir($uploadDir)) {
        @mkdir($uploadDir, 0755, true);
    }
    $dest = $uploadDir . $cleanName;
    $written = @file_put_contents($dest, $decoded);

    if ($written === false) {
        http_response_code(500);
        echo json_encode(['success' => false, 'error' => 'Server failed to write image file']);
        exit;
    }

    echo json_encode([
        'success' => true,
        'url' => 'images/custom/' . $cleanName,
        'message' => 'Photo uploaded successfully'
    ]);
    exit;
}

// Action 3: Save full data payload to data.json
if (!isset($data['payload']) || !is_array($data['payload'])) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Missing payload data']);
    exit;
}

$targetFile = dirname(__DIR__) . '/data.json';
$jsonContent = json_encode($data['payload'], JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);

if ($jsonContent === false) {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'Failed to serialize JSON']);
    exit;
}

$written = @file_put_contents($targetFile, $jsonContent);

if ($written === false) {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'Failed to save data.json. Please check directory permissions.']);
    exit;
}

echo json_encode([
    'success' => true,
    'message' => 'Data saved live successfully to server',
    'bytes' => $written,
    'timestamp' => time()
]);

