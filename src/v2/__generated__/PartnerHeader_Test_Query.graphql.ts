/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type PartnerHeader_Test_QueryVariables = {};
export type PartnerHeader_Test_QueryResponse = {
    readonly partner: {
        readonly " $fragmentRefs": FragmentRefs<"PartnerHeader_partner">;
    } | null;
};
export type PartnerHeader_Test_QueryRawResponse = {
    readonly partner: ({
        readonly name: string | null;
        readonly type: string | null;
        readonly href: string | null;
        readonly profile: ({
            readonly icon: ({
                readonly cropped: ({
                    readonly src: string;
                    readonly srcSet: string;
                }) | null;
            }) | null;
            readonly id: string;
            readonly slug: string;
            readonly name: string | null;
            readonly internalID: string;
            readonly is_followed: boolean | null;
            readonly image: ({
                readonly sm: ({
                    readonly src: string;
                    readonly srcSet: string;
                }) | null;
                readonly md: ({
                    readonly src: string;
                    readonly srcSet: string;
                }) | null;
                readonly lg: ({
                    readonly src: string;
                    readonly srcSet: string;
                }) | null;
            }) | null;
        }) | null;
        readonly locations: ({
            readonly totalCount: number | null;
            readonly edges: ReadonlyArray<({
                readonly node: ({
                    readonly city: string | null;
                    readonly id: string | null;
                }) | null;
            }) | null> | null;
        }) | null;
        readonly id: string | null;
    }) | null;
};
export type PartnerHeader_Test_Query = {
    readonly response: PartnerHeader_Test_QueryResponse;
    readonly variables: PartnerHeader_Test_QueryVariables;
    readonly rawResponse: PartnerHeader_Test_QueryRawResponse;
};



/*
query PartnerHeader_Test_Query {
  partner(id: "white-cube") {
    ...PartnerHeader_partner
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
      cropped(width: 80, height: 80, version: "square140") {
        src
        srcSet
      }
    }
    ...FollowProfileButton_profile
    ...PartnerHeaderImage_profile
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
    "value": "white-cube"
  }
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
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
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v4 = {
  "kind": "Literal",
  "name": "version",
  "value": "wide"
},
v5 = {
  "kind": "Literal",
  "name": "height",
  "value": 600
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "PartnerHeader_Test_Query",
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
            "name": "PartnerHeader_partner"
          }
        ],
        "storageKey": "partner(id:\"white-cube\")"
      }
    ],
    "type": "Query"
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "PartnerHeader_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "Partner",
        "kind": "LinkedField",
        "name": "partner",
        "plural": false,
        "selections": [
          (v1/*: any*/),
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
                    "concreteType": "CroppedImageUrl",
                    "kind": "LinkedField",
                    "name": "cropped",
                    "plural": false,
                    "selections": (v2/*: any*/),
                    "storageKey": "cropped(height:80,version:\"square140\",width:80)"
                  }
                ],
                "storageKey": null
              },
              (v3/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "slug",
                "storageKey": null
              },
              (v1/*: any*/),
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
              },
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
                      (v4/*: any*/),
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
                      (v5/*: any*/),
                      (v4/*: any*/),
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
                      (v5/*: any*/),
                      (v4/*: any*/),
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
              }
            ],
            "storageKey": null
          },
          {
            "alias": "locations",
            "args": [
              {
                "kind": "Literal",
                "name": "first",
                "value": 20
              }
            ],
            "concreteType": "LocationConnection",
            "kind": "LinkedField",
            "name": "locationsConnection",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "totalCount",
                "storageKey": null
              },
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
                      (v3/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": "locationsConnection(first:20)"
          },
          (v3/*: any*/)
        ],
        "storageKey": "partner(id:\"white-cube\")"
      }
    ]
  },
  "params": {
    "id": null,
    "metadata": {},
    "name": "PartnerHeader_Test_Query",
    "operationKind": "query",
    "text": "query PartnerHeader_Test_Query {\n  partner(id: \"white-cube\") {\n    ...PartnerHeader_partner\n    id\n  }\n}\n\nfragment FollowProfileButton_profile on Profile {\n  id\n  slug\n  name\n  internalID\n  is_followed: isFollowed\n}\n\nfragment PartnerHeaderImage_profile on Profile {\n  image {\n    sm: cropped(width: 480, height: 280, version: \"wide\") {\n      src\n      srcSet\n    }\n    md: cropped(width: 900, height: 600, version: \"wide\") {\n      src\n      srcSet\n    }\n    lg: cropped(width: 1600, height: 600, version: \"wide\") {\n      src\n      srcSet\n    }\n  }\n}\n\nfragment PartnerHeader_partner on Partner {\n  name\n  type\n  href\n  profile {\n    icon {\n      cropped(width: 80, height: 80, version: \"square140\") {\n        src\n        srcSet\n      }\n    }\n    ...FollowProfileButton_profile\n    ...PartnerHeaderImage_profile\n    id\n  }\n  locations: locationsConnection(first: 20) {\n    totalCount\n    edges {\n      node {\n        city\n        id\n      }\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '6d448fea989962f873735f54cd4c8cc1';
export default node;
