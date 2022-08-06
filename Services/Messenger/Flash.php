<?php
namespace Ajax\Bundle\FlashMessageBundle\Services\Messenger;

use Symfony\Component\HttpKernel\Event\FilterResponseEvent;
use Symfony\Component\HttpFoundation\Session\Session;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpKernel\Event\ResponseEvent;

/**
 * response listener to ajax requests
 *
 * @author Kai Stärk <kai@staerk.it>
 */
class Flash
{
    protected $session;

    public function __construct(Session $session)
    {
        $this->session = $session;
    }

    public function onKernelResponse(ResponseEvent $event)
    {
        $response = $event->getResponse();

        // modify JSON response object
        if ($response instanceof JsonResponse) {
            // Embed flash messages to the JSON response if there are any
            $flashMessages = $this->session->getFlashBag()->all();

            if (!empty($flashMessages)) {
                // Decode the JSON response before encoding it again with additional data
                $data = json_decode($response->getContent(), true);
                $data['messages'] = $flashMessages;
                $response->setData($data);
            }
        }
    }
}