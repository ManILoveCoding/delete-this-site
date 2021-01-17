const Time = () => {
  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentTime(currentTime + 1);
    }, 1000);
  }, [currentTime]);
};
