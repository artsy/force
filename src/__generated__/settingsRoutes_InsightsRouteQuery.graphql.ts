/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type settingsRoutes_InsightsRouteQueryVariables = {};
export type settingsRoutes_InsightsRouteQueryResponse = {
    readonly me: {
        readonly " $fragmentRefs": FragmentRefs<"InsightsRoute_me">;
    } | null;
};
export type settingsRoutes_InsightsRouteQuery = {
    readonly response: settingsRoutes_InsightsRouteQueryResponse;
    readonly variables: settingsRoutes_InsightsRouteQueryVariables;
};



/*
query settingsRoutes_InsightsRouteQuery {
  me {
    ...InsightsRoute_me
    id
  }
}

fragment ArtistAuctionResultItem_auctionResult on AuctionResult {
  title
  dimension_text: dimensionText
  organization
  artist {
    name
    id
  }
  images {
    larger {
      cropped(width: 100, height: 100) {
        src
        srcSet
        width
        height
      }
    }
  }
  mediumText
  categoryText
  date_text: dateText
  saleDate
  boughtIn
  currency
  price_realized: priceRealized {
    display
    display_usd: displayUSD
    cents_usd: centsUSD
  }
  performance {
    mid
  }
  estimate {
    display
  }
}

fragment InsightsAuctionResults_me on Me {
  myCollectionAuctionResults(first: 6) {
    edges {
      node {
        ...ArtistAuctionResultItem_auctionResult
        id
      }
    }
  }
}

fragment InsightsOverview_info on MyCollectionInfo {
  artworksCount
  artistsCount
}

fragment InsightsRoute_me on Me {
  internalID
  myCollectionInfo {
    artworksCount
    ...InsightsOverview_info
  }
  ...InsightsAuctionResults_me
}
*/

const node: ConcreteRequest = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "display",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "settingsRoutes_InsightsRouteQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Me",
        "kind": "LinkedField",
        "name": "me",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "InsightsRoute_me"
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "settingsRoutes_InsightsRouteQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Me",
        "kind": "LinkedField",
        "name": "me",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "internalID",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "MyCollectionInfo",
            "kind": "LinkedField",
            "name": "myCollectionInfo",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "artworksCount",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "artistsCount",
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "id",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "721560a82d2462babd437b495ee06d47",
    "id": null,
    "metadata": {},
    "name": "settingsRoutes_InsightsRouteQuery",
    "operationKind": "query",
    "text": "query settingsRoutes_InsightsRouteQuery {\n  me {\n    ...InsightsRoute_me\n    id\n  }\n}\n\nfragment ArtistAuctionResultItem_auctionResult on AuctionResult {\n  title\n  dimension_text: dimensionText\n  organization\n  artist {\n    name\n    id\n  }\n  images {\n    larger {\n      cropped(width: 100, height: 100) {\n        src\n        srcSet\n        width\n        height\n      }\n    }\n  }\n  mediumText\n  categoryText\n  date_text: dateText\n  saleDate\n  boughtIn\n  currency\n  price_realized: priceRealized {\n    display\n    display_usd: displayUSD\n    cents_usd: centsUSD\n  }\n  performance {\n    mid\n  }\n  estimate {\n    display\n  }\n}\n\nfragment InsightsAuctionResults_me on Me {\n  myCollectionAuctionResults(first: 6) {\n    edges {\n      node {\n        ...ArtistAuctionResultItem_auctionResult\n        id\n      }\n    }\n  }\n}\n\nfragment InsightsOverview_info on MyCollectionInfo {\n  artworksCount\n  artistsCount\n}\n\nfragment InsightsRoute_me on Me {\n  internalID\n  myCollectionInfo {\n    artworksCount\n    ...InsightsOverview_info\n  }\n  ...InsightsAuctionResults_me\n}\n"
  }
};
})();
(node as any).hash = '05488390d019c37ca002a2608bb08e1b';
export default node;
