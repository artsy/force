/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type EntityTooltipPartnerQueryVariables = {
    id: string;
};
export type EntityTooltipPartnerQueryResponse = {
    readonly partner: {
        readonly " $fragmentRefs": FragmentRefs<"EntityTooltipPartner_partner">;
    } | null;
};
export type EntityTooltipPartnerQuery = {
    readonly response: EntityTooltipPartnerQueryResponse;
    readonly variables: EntityTooltipPartnerQueryVariables;
};



/*
query EntityTooltipPartnerQuery(
  $id: String!
) {
  partner(id: $id) {
    ...EntityTooltipPartner_partner
    id
  }
}

fragment EntityTooltipPartner_partner on Partner {
  name
  href
  profile {
    ...FollowProfileButton_profile
    bio
    fullBio
    image {
      cropped(width: 260, height: 146, version: ["wide", "medium250x165"]) {
        src
        srcSet
        width
        height
      }
    }
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
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "id"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "id"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "EntityTooltipPartnerQuery",
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
            "name": "EntityTooltipPartner_partner"
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
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "EntityTooltipPartnerQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Partner",
        "kind": "LinkedField",
        "name": "partner",
        "plural": false,
        "selections": [
          (v2/*: any*/),
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
              (v3/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "slug",
                "storageKey": null
              },
              (v2/*: any*/),
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
                "kind": "ScalarField",
                "name": "bio",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "fullBio",
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
                    "alias": null,
                    "args": [
                      {
                        "kind": "Literal",
                        "name": "height",
                        "value": 146
                      },
                      {
                        "kind": "Literal",
                        "name": "version",
                        "value": [
                          "wide",
                          "medium250x165"
                        ]
                      },
                      {
                        "kind": "Literal",
                        "name": "width",
                        "value": 260
                      }
                    ],
                    "concreteType": "CroppedImageUrl",
                    "kind": "LinkedField",
                    "name": "cropped",
                    "plural": false,
                    "selections": [
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
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "width",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "height",
                        "storageKey": null
                      }
                    ],
                    "storageKey": "cropped(height:146,version:[\"wide\",\"medium250x165\"],width:260)"
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          (v3/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "18f49e85dadee235374a0569f4193e5b",
    "id": null,
    "metadata": {},
    "name": "EntityTooltipPartnerQuery",
    "operationKind": "query",
    "text": "query EntityTooltipPartnerQuery(\n  $id: String!\n) {\n  partner(id: $id) {\n    ...EntityTooltipPartner_partner\n    id\n  }\n}\n\nfragment EntityTooltipPartner_partner on Partner {\n  name\n  href\n  profile {\n    ...FollowProfileButton_profile\n    bio\n    fullBio\n    image {\n      cropped(width: 260, height: 146, version: [\"wide\", \"medium250x165\"]) {\n        src\n        srcSet\n        width\n        height\n      }\n    }\n    id\n  }\n}\n\nfragment FollowProfileButton_profile on Profile {\n  id\n  slug\n  name\n  internalID\n  is_followed: isFollowed\n}\n"
  }
};
})();
(node as any).hash = 'e2deeced9e8356242c97b49f66d79c53';
export default node;
