import React from "react"
import Main from "../components/MainContent"
import Layout from "../components/layout"
import Typography from "@material-ui/core/Typography"

import Grid from "@material-ui/core/Grid"
import List from "@material-ui/core/List"

import { graphql } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"

import { DateList } from "../components/dateButtonList"
import EventAccordion from "../components/eventAccordion"

// add eventdate results and ride times

export const query = graphql`
  query eventQuery($id: String!) {
    contentfulEvent(id: { eq: $id }) {
      eventName
      image {
        gatsbyImageData
        title
      }
      adultWaivers {
        file {
          url
        }
      }
      juniorWaivers {
        file {
          url
        }
      }
      eventDates {
        date
        subtitle
        isFull
        rideTimes {
          file {
            url
          }
        }
        results {
          file {
            url
          }
        }
      }
      contacts {
        email
        name
        title
        phoneNumber
        details {
          details
        }
      }
      eventInformation {
        raw
      }
      rules {
        raw
      }
      registrationInfo {
        raw
      }
      locationName
      location {
        lat
        lon
      }
    }
  }
`

const Event = ({ data, pageContext }) => {
  const event = data.contentfulEvent
  return (
    <Layout>
      <Main>
        <Typography variant="h3" style={{ paddingTop: "1rem" }}>
          {pageContext.eventName}
        </Typography>
        <Grid container spacing={1} style={{ marginBottom: "1rem" }}>
          <Grid item lg={event.image ? 8 : 12}>
            <List>
              <Grid container>
                {event.eventDates.map((date, index) => (
                  <DateList
                    key={index}
                    date={date}
                    indexId={index}
                    entryURL={`entry`}
                    event={event}
                    isFull={date.isFull}
                    withImage={Boolean(event.image)}
                  />
                ))}
              </Grid>
            </List>
          </Grid>
          {event.image ? (
            <Grid item lg={4}>
              <GatsbyImage
                image={event.image.gatsbyImageData}
                alt={event.image.title}
                objectFit="contain"
                style={{ maxHeight: "400px" }}
              />
            </Grid>
          ) : (
            ""
          )}
        </Grid>
        <EventAccordion event={event} />
      </Main>
    </Layout>
  )
}

export default Event
