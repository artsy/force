/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type PartnerApp_Test_QueryVariables = {};
export type PartnerApp_Test_QueryResponse = {
    readonly partner: {
        readonly " $fragmentRefs": FragmentRefs<"PartnerApp_partner">;
    } | null;
};
export type PartnerApp_Test_Query = {
    readonly response: PartnerApp_Test_QueryResponse;
    readonly variables: PartnerApp_Test_QueryVariables;
};



/*
query PartnerApp_Test_Query {
  partner(id: "example") {
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
  locations: locationsConnection(first: 20) {
    totalCount
  }
  articles: articlesConnection(first: 20) {
    totalCount
  }
}

fragment PartnerApp_partner on Partner {
  profile {
    ...PartnerHeaderImage_profile
    id
  }
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
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "id",
    "value": "example"
  }
],
v1 = {
  "kind": "Literal",
  "name": "version",
  "value": "wide"
},
v2 = [
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
v3 = {
  "kind": "Literal",
  "name": "height",
  "value": 600
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "slug",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v7 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 20
  }
],
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "totalCount",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "PartnerApp_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
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
        "storageKey": "partner(id:\"example\")"
      }
    ],
    "type": "Query"
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "PartnerApp_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
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
                      (v1/*: any*/),
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
                    "selections": (v2/*: any*/),
                    "storageKey": "cropped(height:280,version:\"wide\",width:480)"
                  },
                  {
                    "alias": "md",
                    "args": [
                      (v3/*: any*/),
                      (v1/*: any*/),
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
                    "selections": (v2/*: any*/),
                    "storageKey": "cropped(height:600,version:\"wide\",width:900)"
                  },
                  {
                    "alias": "lg",
                    "args": [
                      (v3/*: any*/),
                      (v1/*: any*/),
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
                    "selections": (v2/*: any*/),
                    "storageKey": "cropped(height:600,version:\"wide\",width:1600)"
                  }
                ],
                "storageKey": null
              },
              (v4/*: any*/),
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
                    "selections": (v2/*: any*/),
                    "storageKey": "resized(height:80,version:\"square140\",width:80)"
                  }
                ],
                "storageKey": null
              },
              (v5/*: any*/),
              (v6/*: any*/),
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
            "args": (v7/*: any*/),
            "concreteType": "LocationConnection",
            "kind": "LinkedField",
            "name": "locationsConnection",
            "plural": false,
            "selections": [
              (v8/*: any*/),
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
                      (v4/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": "locationsConnection(first:20)"
          },
          (v5/*: any*/),
          {
            "alias": "articles",
            "args": (v7/*: any*/),
            "concreteType": "ArticleConnection",
            "kind": "LinkedField",
            "name": "articlesConnection",
            "plural": false,
            "selections": [
              (v8/*: any*/)
            ],
            "storageKey": "articlesConnection(first:20)"
          },
          (v4/*: any*/)
        ],
        "storageKey": "partner(id:\"example\")"
      }
    ]
  },
  "params": {
    "id": null,
    "metadata": {},
    "name": "PartnerApp_Test_Query",
    "operationKind": "query",
    "text": "query PartnerApp_Test_Query {\n  partner(id: \"example\") {\n    ...PartnerApp_partner\n    id\n  }\n}\n\nfragment FollowProfileButton_profile on Profile {\n  id\n  slug\n  name\n  internalID\n  is_followed: isFollowed\n}\n\nfragment NavigationTabs_partner on Partner {\n  slug\n  locations: locationsConnection(first: 20) {\n    totalCount\n  }\n  articles: articlesConnection(first: 20) {\n    totalCount\n  }\n}\n\nfragment PartnerApp_partner on Partner {\n  profile {\n    ...PartnerHeaderImage_profile\n    id\n  }\n  ...PartnerHeader_partner\n  ...NavigationTabs_partner\n}\n\nfragment PartnerHeaderImage_profile on Profile {\n  image {\n    sm: cropped(width: 480, height: 280, version: \"wide\") {\n      src\n      srcSet\n    }\n    md: cropped(width: 900, height: 600, version: \"wide\") {\n      src\n      srcSet\n    }\n    lg: cropped(width: 1600, height: 600, version: \"wide\") {\n      src\n      srcSet\n    }\n  }\n}\n\nfragment PartnerHeader_partner on Partner {\n  name\n  type\n  href\n  profile {\n    icon {\n      resized(width: 80, height: 80, version: \"square140\") {\n        src\n        srcSet\n      }\n    }\n    ...FollowProfileButton_profile\n    id\n  }\n  locations: locationsConnection(first: 20) {\n    totalCount\n    edges {\n      node {\n        city\n        id\n      }\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '0c68d38f034c6d9a33a2e60062afa321';
export default node;
