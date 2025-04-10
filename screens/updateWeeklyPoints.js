const BASE_URL = 'https://ecogo-82491-default-rtdb.asia-southeast1.firebasedatabase.app/users';

export const updateWeeklyPoints = async (userId) => {
  if (!userId) return;

  const today = new Date();
  const dayOfWeek = today.toLocaleDateString('en-US', { weekday: 'long' });

  try {
    // ✅ Reset weekly points on Monday
    if (dayOfWeek === 'Monday') {
      const resetPayload = {
        Monday: 0,
        Tuesday: 0,
        Wednesday: 0,
        Thursday: 0,
        Friday: 0,
        Saturday: 0,
        Sunday: 0,
      };

      await fetch(`${BASE_URL}/${userId}/weeklyPoints.json`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(resetPayload),
      });
    }

    // ✅ Increment current day by 5 points
    const dayRef = `${BASE_URL}/${userId}/weeklyPoints/${dayOfWeek}.json`;
    const currentRes = await fetch(dayRef);
    const currentVal = await currentRes.json() || 0;

    await fetch(dayRef, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(currentVal + 5),
    });

  } catch (err) {
    console.error('❌ Error updating weekly points:', err);
  }
};
