<?php

namespace App\Controller;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use App\Repository\TodoRepository;
use Doctrine\ORM\EntityManagerInterface;

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
     * @Route("/read", name="todo")
     */
    public function index(): Response
    {
       $todos = $this -> TodoRepository -> findAll();
       $arrayOfData = [];
       foreach ($todos as $todo) {
       		$arrayOfData[] = $todo -> ToArray();
       }
       return $this -> json($arrayOfData);
    }
}
