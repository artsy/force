/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type partnerRoutes_PartnerQueryVariables = {
    partnerId: string;
};
export type partnerRoutes_PartnerQueryResponse = {
    readonly partner: {
        readonly " $fragmentRefs": FragmentRefs<"PartnerApp_partner">;
    } | null;
};
export type partnerRoutes_PartnerQuery = {
    readonly response: partnerRoutes_PartnerQueryResponse;
    readonly variables: partnerRoutes_PartnerQueryVariables;
};



/*
query partnerRoutes_PartnerQuery(
  $partnerId: String!
) {
  partner(id: $partnerId) @principalField {
    ...PartnerApp_partner
    id
  }
}

fragment FollowProfileButton_profile on Profile {
  id
  slug
  name
  internalID
  is_followed: isFollowed
}

fragment NavigationTabs_partner on Partner {
  slug
  displayArtistsSection
  locations: locationsConnection(first: 20) {
    totalCount
  }
  articles: articlesConnection {
    totalCount
  }
  artists: artistsConnection(first: 20) {
    totalCount
  }
}

fragment PartnerApp_partner on Partner {
  profile {
    ...PartnerHeaderImage_profile
    id
  }
  ...PartnerMeta_partner
  ...PartnerHeader_partner
  ...NavigationTabs_partner
}

fragment PartnerHeaderImage_profile on Profile {
  image {
    sm: cropped(width: 480, height: 280, version: "wide") {
      src
      srcSet
    }
    md: cropped(width: 900, height: 600, version: "wide") {
      src
      srcSet
    }
    lg: cropped(width: 1600, height: 600, version: "wide") {
      src
      srcSet
    }
  }
}

fragment PartnerHeader_partner on Partner {
  name
  type
  href
  profile {
    icon {
      resized(width: 80, height: 80, version: "square140") {
        src
        srcSet
      }
    }
    ...FollowProfileButton_profile
    id
  }
  locations: locationsConnection(first: 20) {
    totalCount
    edges {
      node {
        city
        id
      }
    }
  }
}

fragment PartnerMeta_partner on Partner {
  slug
  meta {
    image
    title
    description
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "partnerId",
    "type": "String!"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "partnerId"
  }
],
v2 = {
  "kind": "Literal",
  "name": "version",
  "value": "wide"
},
v3 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "src",
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "srcSet",
    "storageKey": null
  }
],
v4 = {
  "kind": "Literal",
  "name": "height",
  "value": 600
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "slug",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v8 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 20
  }
],
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "totalCount",
  "storageKey": null
},
v10 = [
  (v9/*: any*/)
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "partnerRoutes_PartnerQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Partner",
        "kind": "LinkedField",
        "name": "partner",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "PartnerApp_partner"
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Query"
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "partnerRoutes_PartnerQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Partner",
        "kind": "LinkedField",
        "name": "partner",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "Profile",
            "kind": "LinkedField",
            "name": "profile",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "Image",
                "kind": "LinkedField",
                "name": "image",
                "plural": false,
                "selections": [
                  {
                    "alias": "sm",
                    "args": [
                      {
                        "kind": "Literal",
                        "name": "height",
                        "value": 280
                      },
                      (v2/*: any*/),
                      {
                        "kind": "Literal",
                        "name": "width",
                        "value": 480
                      }
                    ],
                    "concreteType": "CroppedImageUrl",
                    "kind": "LinkedField",
                    "name": "cropped",
                    "plural": false,
                    "selections": (v3/*: any*/),
                    "storageKey": "cropped(height:280,version:\"wide\",width:480)"
                  },
                  {
                    "alias": "md",
                    "args": [
                      (v4/*: any*/),
                      (v2/*: any*/),
                      {
                        "kind": "Literal",
                        "name": "width",
                        "value": 900
                      }
                    ],
                    "concreteType": "CroppedImageUrl",
                    "kind": "LinkedField",
                    "name": "cropped",
                    "plural": false,
                    "selections": (v3/*: any*/),
                    "storageKey": "cropped(height:600,version:\"wide\",width:900)"
                  },
                  {
                    "alias": "lg",
                    "args": [
                      (v4/*: any*/),
                      (v2/*: any*/),
                      {
                        "kind": "Literal",
                        "name": "width",
                        "value": 1600
                      }
                    ],
                    "concreteType": "CroppedImageUrl",
                    "kind": "LinkedField",
                    "name": "cropped",
                    "plural": false,
                    "selections": (v3/*: any*/),
                    "storageKey": "cropped(height:600,version:\"wide\",width:1600)"
                  }
                ],
                "storageKey": null
              },
              (v5/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "Image",
                "kind": "LinkedField",
                "name": "icon",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": [
                      {
                        "kind": "Literal",
                        "name": "height",
                        "value": 80
                      },
                      {
                        "kind": "Literal",
                        "name": "version",
                        "value": "square140"
                      },
                      {
                        "kind": "Literal",
                        "name": "width",
                        "value": 80
                      }
                    ],
                    "concreteType": "ResizedImageUrl",
                    "kind": "LinkedField",
                    "name": "resized",
                    "plural": false,
                    "selections": (v3/*: any*/),
                    "storageKey": "resized(height:80,version:\"square140\",width:80)"
                  }
                ],
                "storageKey": null
              },
              (v6/*: any*/),
              (v7/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "internalID",
                "storageKey": null
              },
              {
                "alias": "is_followed",
                "args": null,
                "kind": "ScalarField",
                "name": "isFollowed",
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          (v6/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "PartnerMeta",
            "kind": "LinkedField",
            "name": "meta",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "image",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "title",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "description",
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          (v7/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "type",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "href",
            "storageKey": null
          },
          {
            "alias": "locations",
            "args": (v8/*: any*/),
            "concreteType": "LocationConnection",
            "kind": "LinkedField",
            "name": "locationsConnection",
            "plural": false,
            "selections": [
              (v9/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "LocationEdge",
                "kind": "LinkedField",
                "name": "edges",
                "plural": true,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Location",
                    "kind": "LinkedField",
                    "name": "node",
                    "plural": false,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "city",
                        "storageKey": null
                      },
                      (v5/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": "locationsConnection(first:20)"
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "displayArtistsSection",
            "storageKey": null
          },
          {
            "alias": "articles",
            "args": null,
            "concreteType": "ArticleConnection",
            "kind": "LinkedField",
            "name": "articlesConnection",
            "plural": false,
            "selections": (v10/*: any*/),
            "storageKey": null
          },
          {
            "alias": "artists",
            "args": (v8/*: any*/),
            "concreteType": "ArtistPartnerConnection",
            "kind": "LinkedField",
            "name": "artistsConnection",
            "plural": false,
            "selections": (v10/*: any*/),
            "storageKey": "artistsConnection(first:20)"
          },
          (v5/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "id": null,
    "metadata": {},
    "name": "partnerRoutes_PartnerQuery",
    "operationKind": "query",
    "text": "query partnerRoutes_PartnerQuery(\n  $partnerId: String!\n) {\n  partner(id: $partnerId) @principalField {\n    ...PartnerApp_partner\n    id\n  }\n}\n\nfragment FollowProfileButton_profile on Profile {\n  id\n  slug\n  name\n  internalID\n  is_followed: isFollowed\n}\n\nfragment NavigationTabs_partner on Partner {\n  slug\n  displayArtistsSection\n  locations: locationsConnection(first: 20) {\n    totalCount\n  }\n  articles: articlesConnection {\n    totalCount\n  }\n  artists: artistsConnection(first: 20) {\n    totalCount\n  }\n}\n\nfragment PartnerApp_partner on Partner {\n  profile {\n    ...PartnerHeaderImage_profile\n    id\n  }\n  ...PartnerMeta_partner\n  ...PartnerHeader_partner\n  ...NavigationTabs_partner\n}\n\nfragment PartnerHeaderImage_profile on Profile {\n  image {\n    sm: cropped(width: 480, height: 280, version: \"wide\") {\n      src\n      srcSet\n    }\n    md: cropped(width: 900, height: 600, version: \"wide\") {\n      src\n      srcSet\n    }\n    lg: cropped(width: 1600, height: 600, version: \"wide\") {\n      src\n      srcSet\n    }\n  }\n}\n\nfragment PartnerHeader_partner on Partner {\n  name\n  type\n  href\n  profile {\n    icon {\n      resized(width: 80, height: 80, version: \"square140\") {\n        src\n        srcSet\n      }\n    }\n    ...FollowProfileButton_profile\n    id\n  }\n  locations: locationsConnection(first: 20) {\n    totalCount\n    edges {\n      node {\n        city\n        id\n      }\n    }\n  }\n}\n\nfragment PartnerMeta_partner on Partner {\n  slug\n  meta {\n    image\n    title\n    description\n  }\n}\n"
  }
};
})();
(node as any).hash = 'b065b69c18af67164cd46d476357078f';
export default node;
