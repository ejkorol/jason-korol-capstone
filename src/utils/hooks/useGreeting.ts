import { useState, useEffect } from "react";

function useGreeting() {

  const [ time, setTime ] = useState("");
  const [ date, setDate ] = useState("");
  const [ greeting, setGreeting ] = useState("");
  const [ loading, setLoading ] = useState(true);

  useEffect(() => {
    updateTimeAndGreeting();
    const invervalId = setInterval(updateTimeAndGreeting, 1000);
    return () => clearInterval(invervalId);
  }, []);

  function updateTimeAndGreeting() {
    setLoading(true);
    const d = new Date();
    setTime(d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
    setDate(d.toLocaleDateString('en-US', { weekday: "long", month: "long", day: "numeric" }));

    const morning = "Good Morning";
    const afternoon = "Good Afternoon";
    const evening = "Good Evening";
    const night = "Happy Dreaming";
    const hour = d.getHours();

    if (hour >= 6 && hour < 12) {
      setGreeting(morning);
    } else if (hour >= 12 && hour < 18) {
      setGreeting(afternoon);
    } else if (hour >= 18 && hour < 24) {
      setGreeting(evening);
    } else {
      setGreeting(night);
    };
    setLoading(false);
  };

  return { time, date, greeting, loading };
};

export default useGreeting;
