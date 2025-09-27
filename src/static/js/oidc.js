import * as oauth from "https://cdn.jsdelivr.net/npm/oauth4webapi@3.8.2/+esm";

let saveCode = (code_verifier, code_challenge) => {
  localStorage.setItem("code_verifier", code_verifier);
  localStorage.setItem("code_challenge", code_challenge);
};
let saveState = (state) => {
  localStorage.setItem("state", state);
};

let saveAccessToken = (access_token) => {
  localStorage.setItem("access_token", access_token);
};

let loadCode = () => {
  return {
    code_verifier: localStorage.getItem("code_verifier") || null,
    code_challenge: localStorage.getItem("code_challenge") || null,
  };
};

let loadState = () => {
  return localStorage.getItem("state") || null;
};

let loadAccessToken = () => {
  return localStorage.getItem("access_token") || null;
};

let removeCode = () => {
  localStorage.removeItem("code_verifier");
  localStorage.removeItem("code_challenge");
};

let removeState = () => {
  localStorage.removeItem("state");
};

let removeAccessToken = () => {
  localStorage.removeItem("access_token");
};

let getCurrentUrl = () => {
  const u = new URL(window.location.href);
  return new URL(`${u.protocol}//${u.host}`);
};

let issuer = new URL("https://auth.wah.su/application/o/home/");
let algorithm = "oidc";
let client_id = "26UGVzN8bYC2u5V2jWUJt4xHhp2M9mclOwEynBAH";
let redirect_uri = getCurrentUrl().href;

const as = await oauth
  .discoveryRequest(issuer, { algorithm })
  .then((response) => oauth.processDiscoveryResponse(issuer, response));

const client = { client_id };
const clientAuth = oauth.None();

const code_challenge_method = "S256";
let { code_verifier, code_challenge } = loadCode();
let state = loadState();
if (!state) {
  state = oauth.generateRandomState();
  saveState(state);
}
if (!code_verifier || !code_challenge) {
  code_verifier = oauth.generateRandomCodeVerifier();
  code_challenge = await oauth.calculatePKCECodeChallenge(code_verifier);
  saveCode(code_verifier, code_challenge);
}

const login_btn = document.getElementById("login_btn");
login_btn.addEventListener("click", login);
const logout_btn = document.getElementById("logout_btn");
logout_btn.addEventListener("click", logout);
function logout() {
  removeAccessToken();
  removeCode();
  removeState();
  window.location.href = "/";
}

async function login() {
  removeAccessToken();
  removeCode();
  removeState();

  state = oauth.generateRandomState();
  saveState(state);
  code_verifier = oauth.generateRandomCodeVerifier();
  code_challenge = await oauth.calculatePKCECodeChallenge(code_verifier);
  saveCode(code_verifier, code_challenge);

  const authorizationUrl = new URL(as.authorization_endpoint);
  authorizationUrl.searchParams.set("client_id", client.client_id);
  authorizationUrl.searchParams.set("redirect_uri", redirect_uri);
  authorizationUrl.searchParams.set("response_type", "code");
  authorizationUrl.searchParams.set("scope", "openid profile avatar");
  authorizationUrl.searchParams.set("code_challenge", code_challenge);
  authorizationUrl.searchParams.set(
    "code_challenge_method",
    code_challenge_method
  );
  if (as.code_challenge_methods_supported.includes("S256") !== true) {
    authorizationUrl.searchParams.set("state", state);
  }
  console.log("Redirecting to", authorizationUrl.href);
  window.location.href = authorizationUrl.href;
}

let access_token = loadAccessToken();
const u = new URL(window.location.href);
if (u.searchParams.get("code")) {
  const u = new URL(window.location.href);
  u.searchParams.set("state", state);
  const currentUrl = u;
  const params = oauth.validateAuthResponse(as, client, currentUrl, state);

  const response = await oauth.authorizationCodeGrantRequest(
    as,
    client,
    clientAuth,
    params,
    redirect_uri,
    code_verifier
  );

  const result = await oauth.processAuthorizationCodeResponse(
    as,
    client,
    response
  );

  ({ access_token } = result);
  saveAccessToken(access_token);
  window.location.href = "/";
}

if (access_token) {
  try {
    const response = await oauth.protectedResourceRequest(
      access_token,
      "GET",
      new URL("https://auth.wah.su/application/o/userinfo/")
    );
    const data = await response.json();
    const user_avatar = document.getElementById("user_avatar");
    const user_name = document.getElementById("user_name");
    const user_info = document.getElementById("user_info");
    user_avatar.src = data.picture;
    user_name.textContent = data.name;
    user_info.classList.remove("hidden");
    user_info.classList.add("flex");
    logout_btn.classList.remove("hidden");
  } catch (error) {
    console.error(error);
    removeAccessToken();
    removeCode();
    removeState();
    login_btn.classList.remove("hidden");
  }
} else {
  login_btn.classList.remove("hidden");
  removeAccessToken();
  removeCode();
  removeState();
}
