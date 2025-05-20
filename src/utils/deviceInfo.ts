export const getDeviceInfo = () => {
  return {
    name: navigator.platform,
    userAgent: navigator.userAgent,
    ip: '', // This will be filled by the backend
  };
};

export const getLocation = (): Promise<{
  country?: string;
  city?: string;
  latitude?: number;
  longitude?: number;
}> => {
  return new Promise((resolve) => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const response = await fetch(
              `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${position.coords.latitude}&longitude=${position.coords.longitude}`
            );
            const data = await response.json();
            resolve({
              country: data.countryName,
              city: data.city,
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            });
          } catch (error) {
            resolve({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            });
          }
        },
        () => resolve({}) // Return empty object if user denies location access
      );
    } else {
      resolve({}); // Return empty object if geolocation is not supported
    }
  });
};

export const getTimeInfo = (startTime: Date) => {
  const endTime = new Date();
  return {
    startTime,
    endTime,
    duration: Math.floor((endTime.getTime() - startTime.getTime()) / 1000), // duration in seconds
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
  };
};
