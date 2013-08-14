<?php

class InecController extends AppController {
 
	public $helpers = array('Html', 'Form');

	public function index(){
		
		$this->set('index');
		$this->set("title_for_layout","Home Page");
		
	}
	
	public function view(){
	
		$this->set('view');
		$this->set("title_for_layout","Results");
		
		$value = $this->request->data('name');
		
		var_dump($value);
	
	}
	
}
