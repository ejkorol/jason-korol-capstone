const data = {
  id: 1,
  username: "yinyinland",
  first_name: "yin",
  last_name: "fu",
  email: "yinfu@example.com",
  mbti: "INFJ",
  dob_date: "December 17, 1995",
  dob_time: "628021800000",
  dob_location: "Toronto, ON",
  display_pic: "https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg"
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */

export const seed = async (knex) => {
  await knex('users').del();
  await knex('users').insert(data);
};
