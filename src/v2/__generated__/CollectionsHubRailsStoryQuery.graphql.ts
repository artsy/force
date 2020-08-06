/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type CollectionsHubRailsStoryQueryVariables = {
    collectionID: string;
};
export type CollectionsHubRailsStoryQueryResponse = {
    readonly marketingCollection: {
        readonly linkedCollections: ReadonlyArray<{
            readonly " $fragmentRefs": FragmentRefs<"CollectionsHubRails_linkedCollections">;
        }>;
    } | null;
};
export type CollectionsHubRailsStoryQuery = {
    readonly response: CollectionsHubRailsStoryQueryResponse;
    readonly variables: CollectionsHubRailsStoryQueryVariables;
};



/*
query CollectionsHubRailsStoryQuery(
  $collectionID: String!
) {
  marketingCollection(slug: $collectionID) {
    linkedCollections {
      ...CollectionsHubRails_linkedCollections
    }
    id
  }
}

fragment ArtistSeriesEntity_member on MarketingCollection {
  slug
  headerImage
  thumbnail
  title
  price_guidance: priceGuidance
  artworksConnection(first: 3, aggregations: [TOTAL], sort: "-decayed_merch") {
    edges {
      node {
        artist {
          name
          id
        }
        title
        image {
          url(version: "small")
        }
        id
      }
    }
    id
  }
}

fragment ArtistSeriesRail_collectionGroup on MarketingCollectionGroup {
  groupType
  name
  members {
    slug
    ...ArtistSeriesEntity_member
    id
  }
}

fragment CollectionsHubRails_linkedCollections on MarketingCollectionGroup {
  groupType
  ...FeaturedCollectionsRails_collectionGroup
  ...OtherCollectionsRail_collectionGroup
  ...ArtistSeriesRail_collectionGroup
}

fragment FeaturedCollectionsRails_collectionGroup on MarketingCollectionGroup {
  groupType
  name
  members {
    slug
    title
    description
    price_guidance: priceGuidance
    thumbnail
    id
  }
}

fragment OtherCollectionEntity_member on MarketingCollection {
  slug
  thumbnail
  title
}

fragment OtherCollectionsRail_collectionGroup on MarketingCollectionGroup {
  groupType
  name
  members {
    ...OtherCollectionEntity_member
    id
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "collectionID",
    "type": "String!",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "slug",
    "variableName": "collectionID"
  }
],
v2 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "name",
  "args": null,
  "storageKey": null
},
v3 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "title",
  "args": null,
  "storageKey": null
},
v4 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "id",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "CollectionsHubRailsStoryQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "marketingCollection",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": "MarketingCollection",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "linkedCollections",
            "storageKey": null,
            "args": null,
            "concreteType": "MarketingCollectionGroup",
            "plural": true,
            "selections": [
              {
                "kind": "FragmentSpread",
                "name": "CollectionsHubRails_linkedCollections",
                "args": null
              }
            ]
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "CollectionsHubRailsStoryQuery",
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "marketingCollection",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": "MarketingCollection",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "linkedCollections",
            "storageKey": null,
            "args": null,
            "concreteType": "MarketingCollectionGroup",
            "plural": true,
            "selections": [
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "groupType",
                "args": null,
                "storageKey": null
              },
              (v2/*: any*/),
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "members",
                "storageKey": null,
                "args": null,
                "concreteType": "MarketingCollection",
                "plural": true,
                "selections": [
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "name": "slug",
                    "args": null,
                    "storageKey": null
                  },
                  (v3/*: any*/),
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "name": "description",
                    "args": null,
                    "storageKey": null
                  },
                  {
                    "kind": "ScalarField",
                    "alias": "price_guidance",
                    "name": "priceGuidance",
                    "args": null,
                    "storageKey": null
                  },
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "name": "thumbnail",
                    "args": null,
                    "storageKey": null
                  },
                  (v4/*: any*/),
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "name": "headerImage",
                    "args": null,
                    "storageKey": null
                  },
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "artworksConnection",
                    "storageKey": "artworksConnection(aggregations:[\"TOTAL\"],first:3,sort:\"-decayed_merch\")",
                    "args": [
                      {
                        "kind": "Literal",
                        "name": "aggregations",
                        "value": [
                          "TOTAL"
                        ]
                      },
                      {
                        "kind": "Literal",
                        "name": "first",
                        "value": 3
                      },
                      {
                        "kind": "Literal",
                        "name": "sort",
                        "value": "-decayed_merch"
                      }
                    ],
                    "concreteType": "FilterArtworksConnection",
                    "plural": false,
                    "selections": [
                      {
                        "kind": "LinkedField",
                        "alias": null,
                        "name": "edges",
                        "storageKey": null,
                        "args": null,
                        "concreteType": "FilterArtworksEdge",
                        "plural": true,
                        "selections": [
                          {
                            "kind": "LinkedField",
                            "alias": null,
                            "name": "node",
                            "storageKey": null,
                            "args": null,
                            "concreteType": "Artwork",
                            "plural": false,
                            "selections": [
                              {
                                "kind": "LinkedField",
                                "alias": null,
                                "name": "artist",
                                "storageKey": null,
                                "args": null,
                                "concreteType": "Artist",
                                "plural": false,
                                "selections": [
                                  (v2/*: any*/),
                                  (v4/*: any*/)
                                ]
                              },
                              (v3/*: any*/),
                              {
                                "kind": "LinkedField",
                                "alias": null,
                                "name": "image",
                                "storageKey": null,
                                "args": null,
                                "concreteType": "Image",
                                "plural": false,
                                "selections": [
                                  {
                                    "kind": "ScalarField",
                                    "alias": null,
                                    "name": "url",
                                    "args": [
                                      {
                                        "kind": "Literal",
                                        "name": "version",
                                        "value": "small"
                                      }
                                    ],
                                    "storageKey": "url(version:\"small\")"
                                  }
                                ]
                              },
                              (v4/*: any*/)
                            ]
                          }
                        ]
                      },
                      (v4/*: any*/)
                    ]
                  }
                ]
              }
            ]
          },
          (v4/*: any*/)
        ]
      }
    ]
  },
  "params": {
    "operationKind": "query",
    "name": "CollectionsHubRailsStoryQuery",
    "id": null,
    "text": "query CollectionsHubRailsStoryQuery(\n  $collectionID: String!\n) {\n  marketingCollection(slug: $collectionID) {\n    linkedCollections {\n      ...CollectionsHubRails_linkedCollections\n    }\n    id\n  }\n}\n\nfragment ArtistSeriesEntity_member on MarketingCollection {\n  slug\n  headerImage\n  thumbnail\n  title\n  price_guidance: priceGuidance\n  artworksConnection(first: 3, aggregations: [TOTAL], sort: \"-decayed_merch\") {\n    edges {\n      node {\n        artist {\n          name\n          id\n        }\n        title\n        image {\n          url(version: \"small\")\n        }\n        id\n      }\n    }\n    id\n  }\n}\n\nfragment ArtistSeriesRail_collectionGroup on MarketingCollectionGroup {\n  groupType\n  name\n  members {\n    slug\n    ...ArtistSeriesEntity_member\n    id\n  }\n}\n\nfragment CollectionsHubRails_linkedCollections on MarketingCollectionGroup {\n  groupType\n  ...FeaturedCollectionsRails_collectionGroup\n  ...OtherCollectionsRail_collectionGroup\n  ...ArtistSeriesRail_collectionGroup\n}\n\nfragment FeaturedCollectionsRails_collectionGroup on MarketingCollectionGroup {\n  groupType\n  name\n  members {\n    slug\n    title\n    description\n    price_guidance: priceGuidance\n    thumbnail\n    id\n  }\n}\n\nfragment OtherCollectionEntity_member on MarketingCollection {\n  slug\n  thumbnail\n  title\n}\n\nfragment OtherCollectionsRail_collectionGroup on MarketingCollectionGroup {\n  groupType\n  name\n  members {\n    ...OtherCollectionEntity_member\n    id\n  }\n}\n",
    "metadata": {}
  }
};
})();
(node as any).hash = '681df4bd4ecb21df42a6e2c835b1b433';
export default node;
