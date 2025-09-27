export default function User() {
  return (
    <div className="flex gap-4 pt-4 justify-between items-center">
      <div
        id="login_logout"
        className="ubuntu-mono-regular min-h-[64px] flex items-center"
      >
        <button
          id="login_btn"
          className="hidden bg-amber-600 hover:bg-amber-700 text-white py-2 px-4 rounded-lg hover:rounded-2xl transition-all"
        >
          Login
        </button>
        <button
          id="logout_btn"
          className="hidden bg-amber-600 hover:bg-amber-700 text-white py-2 px-4 rounded-lg hover:rounded-2xl transition-all"
        >
          Logout
        </button>
      </div>
      <div
        className="hidden gap-4 items-center justify-center flex-1"
        id="user_info"
      >
        <div className=" flex gap-2 items-center justify-center flex-1">
          <p className="text-xl ubuntu-mono-regular">
            Welcome back,{" "}
            <span id="user_name" className="font-bold">
              Username
            </span>
            !
          </p>
          <img
            alt=""
            src="#"
            id="user_avatar"
            className="w-12 h-12 rounded-full"
          />
        </div>
        <a href="https://auth.wah.su/" className="bg-amber-600 hover:bg-amber-700 text-white py-2 px-4 rounded-lg hover:rounded-2xl transition-all">Dashboard</a>
      </div>
    </div>
  );
}
