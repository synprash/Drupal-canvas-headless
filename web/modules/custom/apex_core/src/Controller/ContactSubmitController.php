<?php

namespace Drupal\apex_core\Controller;

use Drupal\Core\Controller\ControllerBase;
use Drupal\webform\Entity\Webform;
use Drupal\webform\Entity\WebformSubmission;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;

class ContactSubmitController extends ControllerBase {

  public function submit(Request $request): JsonResponse {
    $corsHeaders = [
      'Access-Control-Allow-Origin' => '*',
      'Access-Control-Allow-Methods' => 'POST, OPTIONS',
      'Access-Control-Allow-Headers' => 'Content-Type, Authorization',
    ];

    if ($request->getMethod() === 'OPTIONS') {
      return new JsonResponse([], 200, $corsHeaders);
    }

    $data = json_decode($request->getContent(), TRUE) ?: [];

    $name = trim($data['name'] ?? '');
    $email = trim($data['email'] ?? '');
    $subject = trim($data['subject'] ?? 'Website Strategy Inquiry (Next.js Decoupled)');
    $message = trim($data['message'] ?? '');

    if (empty($name) || empty($email)) {
      return new JsonResponse(['error' => 'Name and email are required.'], 400, $corsHeaders);
    }

    $webform = Webform::load('contact_form') ?: Webform::load('contact');
    if (!$webform) {
      return new JsonResponse(['error' => 'Webform not found in Drupal.'], 404, $corsHeaders);
    }

    try {
      $values = [
        'webform_id' => $webform->id(),
        'data' => [
          'name' => $name,
          'email' => $email,
          'subject' => $subject,
          'message' => $message,
        ],
      ];

      /** @var \Drupal\webform\WebformSubmissionInterface $submission */
      $submission = WebformSubmission::create($values);
      $submission->save();

      return new JsonResponse([
        'success' => TRUE,
        'sid' => $submission->id(),
        'webform_id' => $webform->id(),
        'message' => 'Webform submission successfully saved in Drupal database.',
      ], 200, $corsHeaders);
    } catch (\Throwable $e) {
      return new JsonResponse(['error' => $e->getMessage()], 500, $corsHeaders);
    }
  }

}
