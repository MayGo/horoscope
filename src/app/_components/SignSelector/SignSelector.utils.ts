"use client";

export interface SelectedSignItem {
  name: string;
  dateRange: string;
  image: string;
}

export const signList: SelectedSignItem[] = [
  {
    name: "Aries",
    dateRange: "March 21 - April 19",
    image: "/signs/aries.png",
  },
  {
    name: "Taurus",
    dateRange: "April 20 - May 20",
    image: "/signs/taurus.png",
  },
  { name: "Gemini", dateRange: "May 21 - June 20", image: "/signs/gemini.png" },
  {
    name: "Cancer",
    dateRange: "June 21 - July 22",
    image: "/signs/cancer.png",
  },
  { name: "Leo", dateRange: "July 23 - August 22", image: "/signs/leo.png" },
  {
    name: "Virgo",
    dateRange: "August 23 - September 22",
    image: "/signs/virgo.png",
  },
  {
    name: "Libra",
    dateRange: "September 23 - October 22",
    image: "/signs/libra.png",
  },
  {
    name: "Scorpio",
    dateRange: "October 23 - November 21",
    image: "/signs/scorpio.png",
  },
  {
    name: "Sagittarius",
    dateRange: "November 22 - December 21",
    image: "/signs/sagittarius.png",
  },
  {
    name: "Capricorn",
    dateRange: "December 22 - January 19",
    image: "/signs/capricorn.png",
  },
  {
    name: "Aquarius",
    dateRange: "January 20 - February 18",
    image: "/signs/aquarius.png",
  },
  {
    name: "Pisces",
    dateRange: "February 19 - March 20",
    image: "/signs/pisces.png",
  },
];
