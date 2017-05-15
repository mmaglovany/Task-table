@Notice-feature
Feature: This is a demo feature

    @Start-app-first-time
    Scenario: The user is showcasing a demo feature
        Given I open the browser
        When I visit the page "notices"
        Then it should display a the message "Tasks list"


    Scenario Outline: The user is showcasing a data-driven demo
        Given I open the browser
        When I visit the page "notices"
        Then it should display a the message "<message>"

    Examples:
      | message           |
      | Tasks list        |