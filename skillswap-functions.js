function filterSkillsByCategory(skills, category) {
  if (category === 'All') {
    return skills;
  }

  return skills.filter(skill => skill.category === category);
}


function calculateTotalCost(hourlyRate, hours) {
  if (hourlyRate === 0 || hours === 0) {
    return 0;
  }

  return hourlyRate * hours;
}


function matchSkillsToUser(userNeeds, skills) {
  return skills.filter(skill => {
    return (
      skill.category === userNeeds.category &&
      skill.price <= userNeeds.maxPrice
    );
  });
}


module.exports = {
  filterSkillsByCategory,
  calculateTotalCost,
  matchSkillsToUser
};
