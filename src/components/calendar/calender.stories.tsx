import { ComponentMeta, ComponentStory } from '@storybook/react'
import 'antd/dist/antd.css'
import moment from 'moment'
import React from 'react'
import Calender from '.'
// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Calender',
  component: Calender,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} as ComponentMeta<typeof Calender>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Calender> = args => (
  <div style={{ height: '120vh' }}>
    <Calender {...args} style={{ height: 600 }} />
  </div>
)

const fakeEvents = [
  {
    date: { start: '2023-09-12', end: '2023-09-12' },
    id: 6478,
    title: 'Sample Event Title',
    icon: null,
    style: {
      backgroundColor: '#8B0000',
    },
  },
  {
    date: { start: '2023-09-12', end: '2023-09-15' },
    id: 641,
    title: 'Another Event Title',
    icon: null,
  },
  {
    date: { start: '2023-09-14', end: '2023-09-15' },
    id: 642,
    title: 'Yet Another Event Title',
    icon: null,
  },
  {
    date: { start: '2023-09-17', end: '2023-09-20' },
    id: 643,
    title: 'Even More Event Title',
    icon: null,
  },
  {
    date: { start: '2023-09-23', end: '2023-09-26' },
    id: 644,
    title: 'All The Events Title',
    icon: null,
  },
]

// Get the current month and year
const currentDate = moment()
const currentMonth = currentDate.format('YYYY-MM')

// Iterate through fakeEvents and update the dates
const updatedEvents = fakeEvents.map(event => {
  // Parse the existing start and end dates
  const startDate = moment(event.date.start)
  const endDate = moment(event.date.end)

  // Check if the start date is in the current month
  if (startDate.format('YYYY-MM') === currentMonth) {
    // If it is, keep the start date as is
    event.date.start = startDate.format('YYYY-MM-DD')
  } else {
    // If it's not, set the start date to the first day of the current month
    event.date.start = currentDate.startOf('month').format('YYYY-MM-DD')
  }

  // Check if the end date is in the current month
  if (endDate.format('YYYY-MM') === currentMonth) {
    // If it is, keep the end date as is
    event.date.end = endDate.format('YYYY-MM-DD')
  } else {
    // If it's not, set the end date to the last day of the current month
    event.date.end = currentDate.endOf('month').format('YYYY-MM-DD')
  }

  return event
})
export const English = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
English.args = {
  lang: 'en',
  events: updatedEvents,
  onDropEvent: item => {
    console.log(item)
  },
}
