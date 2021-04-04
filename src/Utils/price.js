const price = (age, hotspotAsteroids) => {
  return 170 + ((100 * age) / 35 + 10 * hotspotAsteroids);
};

module.exports = price;
