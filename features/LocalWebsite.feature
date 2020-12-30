Feature: Local Website Test
  As a user
  I visit the shopping wabpage
  So that I can buy equipment

  #   Steps already defined
  #   Given the Local Website is open

  #   When the all button is clicked 
  #   Then every item should be visible '5' items
  #   When the "Watersports" button is clicked
  #   Then items related to this category should be visible, must contain 'Watersports'
  #   When the "Running" button is clicked
  #   Then items related to this category should be visible, must contain 'Running' 
  #   When the "Chess" button is clicked
  #   Then items related to this category should be visible, must contain 'Chess'
  #   When the "All" button is clicked 
  #   And the quantity selection menu is clicked
  #   Then quantity options should be visible
  #   When I add one from every item to the Cart
  #   Then Total Amount should be 150
  #   And the number of Total Items should be 5
  #   When the "Submit Order" button is clicked
  #   Then the Back button should be visible
  #   When the "Submit Order" button is clicked
  #   Then the message 'Thanks!' should be visible
  #   When the "OK" button is clicked
  #   Then All categories should be visible


  #  Scenario: 1. Checking the categories
  #    Given the Local Website is open

  #    When the all button is clicked 
  #    Then every item should be visible '5' items
  #    When the "Watersports" button is clicked
  #    Then items related to this category should be visible, must contain 'Watersports'
  #    When the "Running" button is clicked
  #    Then items related to this category should be visible, must contain 'Running' 
  #    When the "Chess" button is clicked
  #    Then items related to this category should be visible, must contain 'Chess'


  # Scenario Outline: 2. Checking the quantity selection
  #   Given the Local Website is open

  #   When the "<xth>" quantity selection menu is clicked
  #   Then the "<xth>" quantity options should be visible

  #   Examples:
  #       | xth |
  #       | 1 |
  #       | 2 |
  #       | 3 |
  #       | 4 |
  #       | 5 | 


    # Scenario: 3. Checking the price in the Cart
    #   Given the Local Website is open

    #   When I add one from every item to the Cart
    #   Then Total Amount should be 150


    # Scenario: 4. Checking the quantity in the Cart
    #   Given the Local Website is open

    #   When I add one from every item to the Cart
    #   Then the number of Total Items should be 5

    Scenario: 5. Checking the Submit Order method
      Given the Local Website is open

      When I add one from every item to the Cart
      Then Total Amount should be 150
      And the number of Total Items should be 5
      When the "Submit Order" button is clicked
      Then the Back button should be visible
      When the "Submit Order" button is clicked
      Then the message 'Thanks!' should be visible
      When the "OK" button is clicked
      Then All categories should be visible


    
  # Scenario Outline: 2. Searching for Software tester jobs - <position>
  #   Given the EPAM career page is opened

  #   When the Location filter box is clicked
  #   And the country "<country>" is selected
  #   And the city "<city>" is selected
  #   And the Skills filter box is clicked
  #   And the role "<category>" is selected
  #   And the Find button is clicked
  #   Then the position "<position>" should be visible
  #   And the priority of "<position>" position should be <priority>
  #   And the location of "<position>" position should be "<city>, <country>"
  #   And the Apply button for "<position>" position should be visible

  #   When the Apply button for "<position>" position is clicked
  #   Then the job description should contain the following text:
  #     """
  #     Currently we are looking for a <position> for our <city> office to make the team even stronger.
  #     """

  #   Examples:
  #     | country | city     | position                 | category                  | priority |
  #     | Hungary | Debrecen | Test Automation Engineer | Software Test Engineering | normal   |
  #     | Hungary | Budapest | Functional Tester        | Software Test Engineering | high     |
