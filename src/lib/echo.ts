import Echo from "laravel-echo";
import Pusher from "pusher-js";

const token =
  typeof window !== "undefined" ? localStorage.getItem("token") : null;

const echo =
  typeof window !== "undefined"
    ? new Echo({
        broadcaster: "pusher",
        key: process.env.NEXT_PUBLIC_PUSHER_APP_KEY!,
        cluster: process.env.NEXT_PUBLIC_PUSHER_APP_CLUSTER!,
        forceTLS: true,
        authEndpoint: "http://localhost:8000/api/broadcasting/auth",
        auth: {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        },
        client: new Pusher(process.env.NEXT_PUBLIC_PUSHER_APP_KEY!, {
          cluster: process.env.NEXT_PUBLIC_PUSHER_APP_CLUSTER!,
        }),
      })
    : null;

export default echo;
