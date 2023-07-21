# UniPost

Under development.

# Understanding

STRUCTURE:
New line (/r/n) pair of characters divide the ASCII character stream of the HTTP message header into lines. Another delimiter, white space, divides the request and status lines into sections. A third delimiter, the colon, separates header names from header values. An empty line marks the end of the header and the beginning of the (optional) message body.

REQUEST METHODS:
Indicate the desired action to be performed on the identified resource.
- GET
    - Requests query or ask the server for a resource.
    - Typically do not include a body.
- POST
    - Send the service some data.
    - Typically do not have a query string.
- PUT
    - Indicates a resource on the server should either be updated or replaced.
    - Typically use a parameterised path to indicate the resource to update.

# Notes
- Add in a future proxy options and add compatibility with Http/Https proxy and add Socks library [-]
- Add help utilites in core modules like; [-]
    - Agent utility to get basic agents. 
    - Cookie utility to build sample cookie.
- Add Http protocol validation, add method isValid and submethods for every struct section (line, headers, body) [-]
- Add config (API, WEB,...) to avoid hardcoded strings. [-]
- Maybe add a class in API and WEB and WSS to make it more clear. [-]
- Maybe divide BASE_PATH from InitConfig interface and passed as parameter in Config class contructor. [-]
- Add config API, WEB, APP interface for metadata (current version, and other data related to the program). [-]
- Add proxy configuration (Socks, Http) [-] 

# Pending last
- Worked with frontend style and funcionalities but we stayed modifing the api and the storage library because the changes done 
in the frontend to start linking the frontend with the api.
That means need to modify and add code from storage and api the same structure with the aplied in the frontend funcionalities.
- The problems that I have is making partial the screen, that means the user can send to the api only the name and the storage
will only modify the name. Another problem is deleting extra propreties that the user can send and we don't want.