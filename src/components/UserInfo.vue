<script>
export default {
  name: "UserInfo",
  props: {
    userInfo: Object,
  },
};
</script>

<template>
  <section class="user-info">
    <h1 class="user-info__title">User Information</h1>
    <div class="user-info__content">
      <div class="user-info__item">
        <p>Main info:</p>
        <ul class="user-info__list list">
          <li class="list__element"><span>Name:</span> {{ userInfo.name }}</li>
          <li class="list__element">
            <span>Username:</span> {{ userInfo.username }}
          </li>
          <li class="list__element">
            <span>Email:</span> {{ userInfo.email }}
          </li>
        </ul>
      </div>
      <div class="user-info__item">
        <p>Address:</p>
        <ul class="user-info__list list">
          <li class="list__element">
            <span>Street:</span> {{ userInfo.address.street }}
          </li>
          <li class="list__element">
            <span>Suite:</span> {{ userInfo.address.suite }}
          </li>
          <li class="list__element">
            <span>City:</span> {{ userInfo.address.city }}
          </li>
          <li class="list__element">
            <span>Zipcode:</span> {{ userInfo.address.zipcode }}
          </li>
        </ul>
      </div>
      <div class="user-info__item">
        <p>Contacts:</p>
        <ul class="user-info__list list">
          <li class="list__element">
            <span>Phone:</span> {{ userInfo.phone }}
          </li>
          <li class="list__element">
            <span>Website:</span> {{ userInfo.website }}
          </li>
        </ul>
      </div>
      <div class="user-info__item">
        <p>Company:</p>
        <ul class="user-info__list list">
          <li class="list__element">
            <span>Name:</span> {{ userInfo.company.name }}
          </li>
          <li class="list__element">
            <span>Catch Phrase:</span>
            {{ userInfo.company.catchPhrase }}
          </li>
          <li class="list__element">
            <span>BS:</span> {{ userInfo.company.bs }}
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
  background-color: #a5a5a5;
  border-radius: 5px;
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

@media (max-width: 768px) {
  .user-info__content {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  }
}

.user-info__item {
  padding: 6px 10px;
  border: 1px solid black;
  border-radius: 5px;
  background-color: #c3c3c3;
}

.list__element {
  list-style: none;
}
</style>
