import { usuariosService } from '../services/usuariosService';
import { loginService } from '../services/loginService';

// Creates a user via API, logs in via API and injects the session the same
// way the frontend does (localStorage serverest/*). Keeps specs fast.
export const createUserAndSession = (user) =>
  usuariosService.create(user).then((res) => {
    const id = res.body._id;
    return loginService.login(user.email, user.password).then((login) => ({
      id,
      token: login.body.authorization,
      nome: user.nome,
      email: user.email,
    }));
  });

export const injectSession = (session) =>
  cy.visit('/login', {
    onBeforeLoad(win) {
      win.localStorage.setItem('serverest/userToken', session.token);
      win.localStorage.setItem('serverest/userNome', session.nome);
      win.localStorage.setItem('serverest/userEmail', session.email);
    },
  });
