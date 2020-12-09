<?php

namespace App\Controller;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use App\Repository\TodoRepository;
use App\Entity\Todo;
use Doctrine\ORM\EntityManagerInterface;
use Exception;

/**
  * @Route("/api/todo", name="todo")
  */
class TodoController
{
	private $EntityManager, $TodoRepository;
	public function __construct(EntityManagerInterface $manager, TodoRepository $repository)
	{
		$this -> EntityManager = $manager;
		$this -> TodoRepository = $repository;
	}

    /**
     * @Route("/read", name="reading", methods={"GET"})
     */
    public function read(): Response
    {
      $todos = $this -> TodoRepository -> findAll();
      $arrayOfData = Array();
      foreach ($todos as $todo) {
       	$arrayOfData[] = $todo -> toArray();
      }
      
      return new JsonResponse($arrayOfData);
    }

    /**
     * @Route("/create", name="adding", methods={"POST"})
     * @param Request $request
     * @return JsonResponse
     */
    public function create(Request $request)
    {
      $data = json_decode(
        $request -> getContent(),
        true
      );

      $todo = new Todo();
      $todo -> setName($data['name']);

      try {
        $this -> EntityManager -> persist($todo);
        $this -> EntityManager -> flush();
        
        return new JsonResponse(
          [
            'id' => $todo -> getId(),
            'name' => $todo -> getName(),
          ],
          JsonResponse::HTTP_CREATED
        );
      } catch (Exception $exception) {
        return new JsonResponse(
          [
            'status' => '500',
          ],
          JsonResponse::HTTP_CREATED
        );
      }
      return new JsonResponse(
        [
          'status' => '200',
        ],
        JsonResponse::HTTP_CREATED
      );
    }

    /**
     * @Route("/update/{id}", name="updating", methods={"PUT"})
     * @param Request $request
     * @return JsonResponse
     */
    public function update(Request $request)
    {
      $data = json_decode(
        $request -> getContent(),
        true
      );

      $todo = new Todo();
      $todo -> setName($data['name']);

      try {
        $this -> EntityManager -> flush();
      } catch (Exception $exception) {
        return new JsonResponse(
          [
            'status' => '500',
          ],
          JsonResponse::HTTP_CREATED
        );
      }
      return new JsonResponse(
        [
          'status' => '200',
        ],
        JsonResponse::HTTP_CREATED
      );
    }

    /**
     * @Route("/delete/{id}", name="deleting", methods={"DELETE"})
     * @param Request $request
     * @return JsonResponse
     */
    public function delete(Todo $todo)
    {
      try {
        $this -> EntityManager -> remove($todo);
        $this -> EntityManager -> flush();
      } catch (Exception $exception) {
        return new JsonResponse(
          [
            'status' => '500',
          ],
          JsonResponse::HTTP_CREATED
        );
      }
      return new JsonResponse(
        [
          'status' => '200',
        ],
        JsonResponse::HTTP_CREATED
      );
    }
}
