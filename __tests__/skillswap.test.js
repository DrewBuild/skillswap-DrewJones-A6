const {
  filterSkillsByCategory,
  calculateTotalCost,
  matchSkillsToUser
} = require('../skillswap-functions');


/* ===============================
   FILTER TESTS
================================ */

describe('filterSkillsByCategory', () => {

  const skills = [
    { title: 'Python Tutoring', category: 'Programming', price: 20 },
    { title: 'Guitar Lessons', category: 'Music', price: 15 },
    { title: 'Resume Review', category: 'Career', price: 0 },
    { title: 'Web Development', category: 'Programming', price: 25 }
  ];

  test('filters skills by category', () => {
    expect(filterSkillsByCategory(skills, 'Programming')).toEqual([
      { title: 'Python Tutoring', category: 'Programming', price: 20 },
      { title: 'Web Development', category: 'Programming', price: 25 }
    ]);
  });

  test('returns all skills when category is All', () => {
    expect(filterSkillsByCategory(skills, 'All')).toEqual(skills);
  });

  test('returns empty array when no matches found', () => {
    expect(filterSkillsByCategory(skills, 'Cooking')).toEqual([]);
  });

});


/* ===============================
   CALCULATE COST TESTS
================================ */

describe('calculateTotalCost', () => {

  test('returns correct total for rate and hours', () => {
    expect(calculateTotalCost(20, 2)).toBe(40);
  });

  test('handles free sessions (rate 0)', () => {
    expect(calculateTotalCost(0, 3)).toBe(0);
  });

  test('handles decimal hours', () => {
    expect(calculateTotalCost(25, 1.5)).toBe(37.5);
  });

  test('returns 0 if hours are 0', () => {
    expect(calculateTotalCost(20, 0)).toBe(0);
  });

});


/* ===============================
   MATCH SKILLS TESTS
================================ */

describe('matchSkillsToUser', () => {

  const skills = [
    { title: 'Python Tutoring', category: 'Programming', price: 20 },
    { title: 'JavaScript Help', category: 'Programming', price: 25 },
    { title: 'Guitar Lessons', category: 'Music', price: 15 },
    { title: 'Resume Review', category: 'Career', price: 0 }
  ];

  test('matches by category and price', () => {
    const userNeeds = { category: 'Programming', maxPrice: 30 };

    expect(matchSkillsToUser(userNeeds, skills)).toEqual([
      { title: 'Python Tutoring', category: 'Programming', price: 20 },
      { title: 'JavaScript Help', category: 'Programming', price: 25 }
    ]);
  });

  test('filters by max price', () => {
    const userNeeds = { category: 'Programming', maxPrice: 20 };

    expect(matchSkillsToUser(userNeeds, skills)).toEqual([
      { title: 'Python Tutoring', category: 'Programming', price: 20 }
    ]);
  });

  test('returns empty array if no matches', () => {
    const userNeeds = { category: 'Cooking', maxPrice: 100 };

    expect(matchSkillsToUser(userNeeds, skills)).toEqual([]);
  });

  test('includes free skills when maxPrice is 0', () => {
    const userNeeds = { category: 'Career', maxPrice: 0 };

    expect(matchSkillsToUser(userNeeds, skills)).toEqual([
      { title: 'Resume Review', category: 'Career', price: 0 }
    ]);
  });

});
