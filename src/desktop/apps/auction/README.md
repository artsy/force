# Auction SHOW page

### Bidder Creation Flow

```
          +-----------+*+*+*+*+---------------^------------------------------------------------+
          |          User Visits             |                                                 |
+---------> /auction/:slug/registration+flow |              +---+[Client]+----+                |
|         +-----------------------------------------------> |REGISTRATION FLOW|                +
|                                                 |         +-----------------+            Redirect
|                                                 |                 |                          +
|                                                 |                 |                          |
|                                                 |                 |                          |
|         +---------+*+*+*+*+--------+            |            +----v-----+  No          +----------+
|         |User ^isits /auction/:slug|            |            |Logged In?+-------------->Auth Modal|
|         +--------------------------+            |            +----------+              +----------+
|                     |                           |                 |Yes
|                     |                           |                 |
|               +----------------------+          |        +--------v------------+ Yes
|               |User Clicks 'Register'+----------+        | Already Registered? +-------------------+
|               +----------------------+                   +---------------------+                   |
|                                                                   |No                              |
|                                                                   |                                |
|        +---------+*+*+*+*+---------+                 No   +-------v----------+                     |
|        |     User Visits           +^---------------------+User has qualified|                     |
|        |/auction+registration/:slug|     Redirect         | credit cards?    |                     |
|        +---------------------------+                      +------------------+                     |
|                      |             ^                              |Yes                             |
|                      |             |                              |                                |
|                      |             |                              |                                |
|                      v             |                     +--------v-------------+   Close          |
|            +-----+[Ser^er]+-----+  |                     |Show Accept Conditions|   Modal   +------v-------------+
|            |BIDDER CREATION FLOW<-------------------+    |of Sale Modal         +----------^+URL is auction/:slug|
|            +--------------------+  |                |    +----------------------+           +--------------------+
|              |                     |                |             |
|              |    +--+No+---^-----------+           |             |
|              ^    |         |Redirect to|           |             |
|          +----------+       |Login      |           |    +--------v--------------+
|          |Logged In?|       +-----------+           |    |User Accepts Conditions|
|          +----------+                               |    +-----------------------+
|              |                                      |             |
|              ++Sale is registerable                 |             |
|              | (else render registration+error)     |    +--------v------------------------------------------------+
|              |                                      +----+    Navigates to                                         |
|              |                                           |    /auction+registration/:slug?accepted+conditions=true |
|              ++User is not registered                    +---------------------------------------------------------+
|              | (else redirect to
|              |  /auction/:slug/confirm+registration)
|              |
|              ++Sale is found (else 404)
|              |
|              |                          +---------------------+
|      +-------v----------+    No         |Render 'registration'+----------------+
|      |User has qualified+--------------->Credit Card Form     |                |
|      | credit cards?    |               +---------------------+                |
|      +------------------+                                            +---------v-------------------------+
|              |                +---------------------------+          |CREATE BIDDER                      |
|              +----+Yes+------^+ User came through modal?  +--+Yes+--->& Redirect to                      |
|                               |(?accepted+conditions=true)|          |/auction/:slug/confirm+registration|
|                               +---------------------------+          +-----------------------------------+
|                                           +
|                                          No
|                                           +
+---------------------------^-^+Redirect+---+
```
