/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ArtworkDetails_SubmissionFlowTest_QueryVariables = {
    id: string;
};
export type ArtworkDetails_SubmissionFlowTest_QueryResponse = {
    readonly submission: {
        readonly " $fragmentRefs": FragmentRefs<"ArtworkDetails_submission">;
    } | null;
};
export type ArtworkDetails_SubmissionFlowTest_Query = {
    readonly response: ArtworkDetails_SubmissionFlowTest_QueryResponse;
    readonly variables: ArtworkDetails_SubmissionFlowTest_QueryVariables;
};



/*
query ArtworkDetails_SubmissionFlowTest_Query(
  $id: ID!
) {
  submission(id: $id) {
    ...ArtworkDetails_submission
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
  locationPostalCode
  locationCountryCode
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
  "name": "id",
  "storageKey": null
},
v3 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "ID"
},
v4 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "String"
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "ArtworkDetails_SubmissionFlowTest_Query",
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
    "name": "ArtworkDetails_SubmissionFlowTest_Query",
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
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "name",
                "storageKey": null
              },
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
            "name": "locationPostalCode",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "locationCountryCode",
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
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "873a95b10fe5e28c3fea51e31f54ec2e",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "submission": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ConsignmentSubmission"
        },
        "submission.artist": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Artist"
        },
        "submission.artist.id": (v3/*: any*/),
        "submission.artist.internalID": (v3/*: any*/),
        "submission.artist.name": (v4/*: any*/),
        "submission.attributionClass": {
          "enumValues": [
            "LIMITED_EDITION",
            "OPEN_EDITION",
            "UNIQUE",
            "UNKNOWN_EDITION"
          ],
          "nullable": true,
          "plural": false,
          "type": "ConsignmentAttributionClass"
        },
        "submission.depth": (v4/*: any*/),
        "submission.dimensionsMetric": (v4/*: any*/),
        "submission.editionNumber": (v4/*: any*/),
        "submission.editionSize": (v4/*: any*/),
        "submission.height": (v4/*: any*/),
        "submission.id": (v3/*: any*/),
        "submission.locationCity": (v4/*: any*/),
        "submission.locationCountry": (v4/*: any*/),
        "submission.locationCountryCode": (v4/*: any*/),
        "submission.locationPostalCode": (v4/*: any*/),
        "submission.locationState": (v4/*: any*/),
        "submission.medium": (v4/*: any*/),
        "submission.provenance": (v4/*: any*/),
        "submission.title": (v4/*: any*/),
        "submission.width": (v4/*: any*/),
        "submission.year": (v4/*: any*/)
      }
    },
    "name": "ArtworkDetails_SubmissionFlowTest_Query",
    "operationKind": "query",
    "text": "query ArtworkDetails_SubmissionFlowTest_Query(\n  $id: ID!\n) {\n  submission(id: $id) {\n    ...ArtworkDetails_submission\n    id\n  }\n}\n\nfragment ArtworkDetails_submission on ConsignmentSubmission {\n  id\n  artist {\n    internalID\n    name\n    id\n  }\n  locationCity\n  locationCountry\n  locationState\n  locationPostalCode\n  locationCountryCode\n  year\n  title\n  medium\n  attributionClass\n  editionNumber\n  editionSize\n  height\n  width\n  depth\n  dimensionsMetric\n  provenance\n}\n"
  }
};
})();
(node as any).hash = 'd8bbfe0bd79359f3c18de6c33f50d622';
export default node;
