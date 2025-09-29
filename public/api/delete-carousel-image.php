<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] !== 'DELETE') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit();
}

try {
    // Get the request body
    $input = file_get_contents('php://input');
    $data = json_decode($input, true);

    if (!isset($data['imagePath'])) {
        throw new Exception('Image path not provided');
    }

    $imagePath = $data['imagePath'];

    // Security check: only allow deletion of files in adminImages directory
    if (!str_starts_with($imagePath, '/adminImages/')) {
        throw new Exception('Invalid image path');
    }

    // Remove leading slash and construct full path
    $filename = substr($imagePath, 1); // Remove leading /
    $filepath = dirname(__DIR__) . '/' . $filename;

    // Check if file exists and delete it
    if (file_exists($filepath)) {
        if (!unlink($filepath)) {
            throw new Exception('Failed to delete file');
        }
    }

    // Return success response
    echo json_encode([
        'success' => true,
        'message' => 'File deleted successfully'
    ]);

} catch (Exception $e) {
    http_response_code(400);
    echo json_encode([
        'error' => $e->getMessage(),
        'success' => false
    ]);
}
?>