<script>
  export let item
</script>

<h1>{item}</h1>

<form action="/api" method="post">
  <input type="text" name="item" />
  <button class="btn" type="submit">Submit</button>
</form>