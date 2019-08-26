<template>
  <div style="width: 500px; margin: 0 auto;">
    <b-card-group deck>
      <b-card>
        <b-card-header>
          <b-button v-if="loggedIn" v-on:click="signOut" variant="outline-primary">Log out</b-button>
          <router-link v-else :to="{ name: 'home' }">
            <b-button variant="outline-primary">Login</b-button>
          </router-link>
        </b-card-header>
        <br />

        <b-card-group deck>
          <b-card header="New Tasks">
            <b-list-group>
              <b-form-input v-model="text" placeholder="Enter task" v-on:keyup.enter="addTask"></b-form-input>
              <br />
              <b-button v-model="text" variant="outline-secondary" v-on:click="addTask">Add Task</b-button>
            </b-list-group>
          </b-card>
        </b-card-group>
        <br />
        <b-card-group deck>
          <b-card header="Current Tasks">
            <b-list-group v-for="task in tasks" v-bind:key="task._id">
              <b-list-group-item href="#">
                <span style="float: left;">{{task.text}}</span>
                <b-button
                  style="float: right;"
                  variant="danger"
                  v-on:click="deleteTask(task._id)"
                >Delete</b-button>
              </b-list-group-item>
            </b-list-group>
          </b-card>
        </b-card-group>
      </b-card>
    </b-card-group>
  </div>
</template>

<script>
import ApiService, { TaskService } from "../common/api.service";
import jwtService from "../common/jwt.service";

export default {
  name: "Task",
  async mounted() {
    if (jwtService.getToken()) {
      ApiService.setHeader();
      const { data } = await TaskService.query();
      this.tasks = data.tasks;
    }
  },
  methods: {
    async addTask(event) {
      const text = event.target.value;
      if (text) {
        if (jwtService.getToken()) {
          const { data } = await TaskService.create(text);
          this.tasks.push({ _id: data._id, text });
          this.text = null;
        } else {
          alert("You need to login!");
        }
      }
    },
    async deleteTask(id) {
      await TaskService.destroy(id);
      this.tasks = this.tasks.filter(task => task._id !== id);
    },
    signOut() {
      jwtService.destroyToken();
      location.reload()
    }
  },
  data() {
    return {
      text: null,
      tasks: [],
      loggedIn: jwtService.getToken() ? true : false
    };
  }
};
</script>