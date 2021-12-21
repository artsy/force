/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type consignRoutes_submissionQueryVariables = {
    id: string;
};
export type consignRoutes_submissionQueryResponse = {
    readonly submission: {
        readonly " $fragmentRefs": FragmentRefs<"ArtworkDetails_submission" | "UploadPhotos_submission" | "ContactInformation_submission">;
    } | null;
    readonly me: {
        readonly " $fragmentRefs": FragmentRefs<"ContactInformation_me">;
    } | null;
};
export type consignRoutes_submissionQuery = {
    readonly response: consignRoutes_submissionQueryResponse;
    readonly variables: consignRoutes_submissionQueryVariables;
};



/*
query consignRoutes_submissionQuery(
  $id: ID!
) {
  submission(id: $id) {
    ...ArtworkDetails_submission
    ...UploadPhotos_submission
    ...ContactInformation_submission
    id
  }
  me {
    ...ContactInformation_me
    id
  }
}

fragment ArtworkDetails_submission on ConsignmentSubmission {
  id
  artist {
    internalID
    name
    id
  }
  locationCity
  locationCountry
  locationState
  year
  title
  medium
  attributionClass
  editionNumber
  editionSize
  height
  width
  depth
  dimensionsMetric
  provenance
}

fragment ContactInformation_me on Me {
  name
  email
  phone
  phoneNumber {
    isValid
    international: display(format: INTERNATIONAL)
    national: display(format: NATIONAL)
    regionCode
  }
}

fragment ContactInformation_submission on ConsignmentSubmission {
  id
}

fragment UploadPhotos_submission on ConsignmentSubmission {
  id
  assets {
    id
    imageUrls
    geminiToken
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "id",
    "type": "ID!"
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
  "name": "id",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "consignRoutes_submissionQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "ConsignmentSubmission",
        "kind": "LinkedField",
        "name": "submission",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "ArtworkDetails_submission"
          },
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "UploadPhotos_submission"
          },
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "ContactInformation_submission"
          }
        ],
        "storageKey": null
      },
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
            "name": "ContactInformation_me"
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
    "name": "consignRoutes_submissionQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "ConsignmentSubmission",
        "kind": "LinkedField",
        "name": "submission",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "Artist",
            "kind": "LinkedField",
            "name": "artist",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "internalID",
                "storageKey": null
              },
              (v3/*: any*/),
              (v2/*: any*/)
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "locationCity",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "locationCountry",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "locationState",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "year",
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
            "name": "medium",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "attributionClass",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "editionNumber",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "editionSize",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "height",
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
            "name": "depth",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "dimensionsMetric",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "provenance",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "ConsignmentSubmissionCategoryAsset",
            "kind": "LinkedField",
            "name": "assets",
            "plural": true,
            "selections": [
              (v2/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "imageUrls",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "geminiToken",
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "Me",
        "kind": "LinkedField",
        "name": "me",
        "plural": false,
        "selections": [
          (v3/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "email",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "phone",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "PhoneNumberType",
            "kind": "LinkedField",
            "name": "phoneNumber",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "isValid",
                "storageKey": null
              },
              {
                "alias": "international",
                "args": [
                  {
                    "kind": "Literal",
                    "name": "format",
                    "value": "INTERNATIONAL"
                  }
                ],
                "kind": "ScalarField",
                "name": "display",
                "storageKey": "display(format:\"INTERNATIONAL\")"
              },
              {
                "alias": "national",
                "args": [
                  {
                    "kind": "Literal",
                    "name": "format",
                    "value": "NATIONAL"
                  }
                ],
                "kind": "ScalarField",
                "name": "display",
                "storageKey": "display(format:\"NATIONAL\")"
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "regionCode",
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          (v2/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "id": null,
    "metadata": {},
    "name": "consignRoutes_submissionQuery",
    "operationKind": "query",
    "text": "query consignRoutes_submissionQuery(\n  $id: ID!\n) {\n  submission(id: $id) {\n    ...ArtworkDetails_submission\n    ...UploadPhotos_submission\n    ...ContactInformation_submission\n    id\n  }\n  me {\n    ...ContactInformation_me\n    id\n  }\n}\n\nfragment ArtworkDetails_submission on ConsignmentSubmission {\n  id\n  artist {\n    internalID\n    name\n    id\n  }\n  locationCity\n  locationCountry\n  locationState\n  year\n  title\n  medium\n  attributionClass\n  editionNumber\n  editionSize\n  height\n  width\n  depth\n  dimensionsMetric\n  provenance\n}\n\nfragment ContactInformation_me on Me {\n  name\n  email\n  phone\n  phoneNumber {\n    isValid\n    international: display(format: INTERNATIONAL)\n    national: display(format: NATIONAL)\n    regionCode\n  }\n}\n\nfragment ContactInformation_submission on ConsignmentSubmission {\n  id\n}\n\nfragment UploadPhotos_submission on ConsignmentSubmission {\n  id\n  assets {\n    id\n    imageUrls\n    geminiToken\n  }\n}\n"
  }
};
})();
(node as any).hash = 'ae9cf1dbafa5e211084145eca0646fda';
export default node;
