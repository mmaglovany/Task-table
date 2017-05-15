@Add-Item-feature
Feature: This is a demo feature

    @Start-app-first-time
    Scenario: The user is showcasing a demo feature
        Given I open the browser
        When I visit the page "notices/create"
        Then it should display a the message "Add notice"