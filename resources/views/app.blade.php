@extends('layouts.app') 
@section('content') 
  @parent
  <div id="app">
    <example-component></example-component>

  </div>

<script src="/manak/js/app.js"></script>
@endsection
 
@section('scripts') @parent
@endsection