# UniPost

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
