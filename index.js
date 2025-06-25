let activities = [];

export default function handler(req, res) {
  if (req.method === 'GET') {
    res.status(200).json(activities);
  } else if (req.method === 'POST') {
    const { name, day, time, duration } = req.body;

    if (!name || !day || !time || !duration) {
      return res.status(400).json({ message: 'Неверные данные' });
    }

    const conflict = activities.find(a => a.day === day && a.time === time);
    if (conflict) {
      return res.status(400).json({ message: 'Занятие пересекается с существующим.' });
    }

    const newActivity = {
      _id: Date.now().toString(),
      name,
      day,
      time,
      duration
    };
    activities.push(newActivity);
    res.status(201).json(newActivity);
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Метод ${req.method} не разрешён`);
  }
}
