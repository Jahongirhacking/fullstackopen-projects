```mermaid
  sequenceDiagram
      participant browser
      participant server
  
      browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
      activate server
      server-->>browser: HTML document
      deactivate server
  
      Note right of browser: Browser changes the list without redirection and sends the POST request under the hood
  
      browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
      activate server
      server-->>browser: HTML document
      deactivate server
  
      Note right of browser: Browser changes the list without redirection and sends the POST request under the hood
```
