@extends('layouts.base') 
@section('main')
<div class="container">
  <div class="row">
    <div class="col-8 offset-2">

      <h2>Poem list</h2>
      <ul id='books-list' class="list-group">
        <li class="list-group-item active">Active item</li>
        <li class="list-group-item">Item</li>
      </ul>
    </div>

  </div>
  <div class="row">
    <div class="col-8 offset-2">
      <h2></h2>
      <div class="content"></div>
    </div>
  </div>

</div>
@endsection
 
@section('scripts') @parent
<script src="/manak/js/books.js"></script>
@endsection