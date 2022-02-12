import React, { useState, useLayoutEffect } from "react"

import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import Button from "@material-ui/core/Button"
import Accordion from "@material-ui/core/Accordion"
import AccordionSummary from "@material-ui/core/AccordionSummary"
import AccordionDetails from "@material-ui/core/AccordionDetails"
import ExpandMoreIcon from "@material-ui/icons/ExpandMore"
import { renderRichText } from "gatsby-source-contentful/rich-text"
import ContactCard from "./contactCard"
import { Link } from "gatsby"
import Entry from "../templates/entry"

// push or remove ids to an array, determine true/false based on presence in array

const EventAccordion = ({ event, data }) => {
  const [expand, setExpand] = useState("info")

  useLayoutEffect(accordionId => {
    const anchor = window.location.hash.split("#")[1]
    if (anchor) {
      const anchorEl = document.getElementById(anchor)
      if (anchorEl) {
        setExpand(anchor)
        anchorEl.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }
    }
  }, [])

  const handleChange = idString => {
    if (expand === idString) {
      setExpand(null)
    } else {
      setExpand(idString)
    }

    // setExpand(expand => [...expand, { idString: true }])
    // setSelectedSessions(selectedSessions => [...selectedSessions, session])
    // if ((expand[id] = true)) {
    //   setExpand(...expand, { id: false })
    // } else {
    //   setExpand(...expand, { id: true })
    // }
  }

  return (
    <div>
      {event.eventInformation && (
        <Accordion
          onChange={() => handleChange("info")}
          className={
            expand === "info" ? "event-border" : "event-border accordion-hover"
          }
          expanded={expand === "info" ? true : false}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="info-content"
            id="info"
          >
            <Typography variant="h4" component="h2">
              Event Info
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              {renderRichText(event.eventInformation)}

              {event.resources &&
                event.resources.map(resource => (
                  <a href={resource.file.url} target="_blank" rel="noreferrer">
                    <Button
                      variant="contained"
                      color="primary"
                      style={{ margin: "5px" }}
                    >
                      {resource.file.fileName}
                    </Button>
                  </a>
                ))}
            </Typography>
          </AccordionDetails>
        </Accordion>
      )}
      {event.rules && (
        <Accordion
          onChange={() => handleChange("rules")}
          className={
            expand === "rules" ? "event-border" : "event-border accordion-hover"
          }
          expanded={expand === "rules" ? true : false}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="rules-content"
            id="rules"
          >
            <Typography variant="h4" component="h2">
              Rules
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>{renderRichText(event.rules)}</Typography>
          </AccordionDetails>
        </Accordion>
      )}
      {event.testInfo && (
        <Accordion
          onChange={() => handleChange("testInfo")}
          expanded={expand === "testInfo" ? true : false}
          className={
            expand === "testInfo"
              ? "event-border"
              : "event-border accordion-hover"
          }
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="testInfo"
            id="testInfo"
          >
            <Typography variant="h4" component="h2">
              Test Info
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>{renderRichText(event.testInfo)}</Typography>
          </AccordionDetails>
        </Accordion>
      )}
      {event.cancellationPolicy && (
        <Accordion
          onChange={() => handleChange("cancellationPolicy")}
          className={
            expand === "cancellationPolicy"
              ? "event-border"
              : "event-border accordion-hover"
          }
          expanded={expand === "cancellationPolicy" ? true : false}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="cancellation policy"
            id="cancellationPolicy"
          >
            <Typography variant="h4" component="h2">
              Cancellation Policy
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>{renderRichText(event.cancellationPolicy)}</Typography>
          </AccordionDetails>
        </Accordion>
      )}
      <Accordion
        onChange={() => handleChange("reg")}
        expanded={expand === "reg" ? true : false}
        className={
          expand === "reg" ? "event-border" : "event-border accordion-hover"
        }
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="reg"
          id="reg"
        >
          <Typography variant="h4" component="h2">
            Registration
          </Typography>
        </AccordionSummary>
        <AccordionDetails style={{ flexDirection: "column" }}>
          {/* {event.confirmationMessage && (
            <Typography>{renderRichText(event.confirmationMessage)}</Typography>
          )}

          {event.registrationInfo && (
            <Typography>{renderRichText(event.registrationInfo)}</Typography>
          )} */}
          <Entry data={data} />

          {/* <Link to={"entry"} style={{ textDecoration: "none" }}>
            <Button
              variant="contained"
              color="primary"
              style={{ margin: "0.5rem 0.2rem" }}
            >
              Entry Form
            </Button> 
          </Link>
            */}
        </AccordionDetails>
      </Accordion>

      {event.contacts ? (
        <Accordion
          onChange={() => handleChange("contacts")}
          expanded={expand === "contacts" ? true : false}
          className={
            expand === "contacts"
              ? "event-border"
              : "event-border accordion-hover"
          }
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="contacts-info"
            id="contacts"
          >
            <Typography variant="h4" component="h2">
              Contacts
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={3}>
              {event.contacts.map((contact, index) => (
                <ContactCard contact={contact} key={index} />
              ))}
            </Grid>
          </AccordionDetails>
        </Accordion>
      ) : (
        " "
      )}
    </div>
  )
}

export default EventAccordion
