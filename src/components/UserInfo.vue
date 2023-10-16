<template>
  <section class="user-info">
    <h1 class="user-info__title">User Information</h1>
    <div class="user-info__content">
      <div class="user-info__item">
        <p>Main info:</p>
        <ul class="user-info__list list">
          <li class="list__element">
            <span>Name:</span> {{ $store.state.user.name }}
          </li>
          <li class="list__element">
            <span>Username:</span> {{ $store.state.user.username }}
          </li>
          <li class="list__element">
            <span>Email:</span> {{ $store.state.user.email }}
          </li>
        </ul>
      </div>
      <div class="user-info__item">
        <p>Address:</p>
        <ul class="user-info__list list">
          <li class="list__element">
            <span>Street:</span> {{ $store.state.user.address.street }}
          </li>
          <li class="list__element">
            <span>Suite:</span> {{ $store.state.user.address.suite }}
          </li>
          <li class="list__element">
            <span>City:</span> {{ $store.state.user.address.city }}
          </li>
          <li class="list__element">
            <span>Zipcode:</span> {{ $store.state.user.address.zipcode }}
          </li>
        </ul>
      </div>
      <div class="user-info__item">
        <p>Contacts:</p>
        <ul class="user-info__list list">
          <li class="list__element">
            <span>Phone:</span> {{ $store.state.user.phone }}
          </li>
          <li class="list__element">
            <span>Website:</span> {{ $store.state.user.website }}
          </li>
        </ul>
      </div>
      <div class="user-info__item">
        <p>Company:</p>
        <ul class="user-info__list list">
          <li class="list__element">
            <span>Name:</span> {{ $store.state.user.company.name }}
          </li>
          <li class="list__element">
            <span>Catch Phrase:</span>
            {{ $store.state.user.company.catchPhrase }}
          </li>
          <li class="list__element">
            <span>BS:</span> {{ $store.state.user.company.bs }}
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<style>
.user-info {
  padding: 30px;
  border: 1px solid black;
  background-color: white;
}
.user-info__title {
  width: 100%;
  margin-bottom: 10px;
}

.user-info__content {
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(auto-fill, minmax(440px, 1fr));
}

.user-info__item {
  padding: 6px 10px;
  border: 1px solid black;
  border-radius: 5px;
}

.list__element {
  list-style: none;
}
</style>

<script>
export default {
  name: "UserInfo",
};
</script>
