/**
 * @generated SignedSource<<ab2cc0564327f54f83ea6aba04a37900>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type ConsignmentAttributionClass = "LIMITED_EDITION" | "OPEN_EDITION" | "UNIQUE" | "UNKNOWN_EDITION" | "%future added value";
export type ConsignmentSubmissionCategoryAggregation = "ARCHITECTURE" | "DESIGN_DECORATIVE_ART" | "DRAWING_COLLAGE_OR_OTHER_WORK_ON_PAPER" | "FASHION_DESIGN_AND_WEARABLE_ART" | "INSTALLATION" | "JEWELRY" | "MIXED_MEDIA" | "OTHER" | "PAINTING" | "PERFORMANCE_ART" | "PHOTOGRAPHY" | "PRINT" | "SCULPTURE" | "TEXTILE_ARTS" | "VIDEO_FILM_ANIMATION" | "%future added value";
export type ConsignmentSubmissionStateAggregation = "APPROVED" | "CLOSED" | "DRAFT" | "HOLD" | "PUBLISHED" | "REJECTED" | "SUBMITTED" | "%future added value";
export type UpdateSubmissionMutationInput = {
  additionalInfo?: string | null;
  artistID?: string | null;
  attributionClass?: ConsignmentAttributionClass | null;
  authenticityCertificate?: boolean | null;
  category?: ConsignmentSubmissionCategoryAggregation | null;
  clientMutationId?: string | null;
  currency?: string | null;
  depth?: string | null;
  dimensionsMetric?: string | null;
  edition?: boolean | null;
  editionNumber?: string | null;
  editionSize?: number | null;
  editionSizeFormatted?: string | null;
  externalId?: string | null;
  height?: string | null;
  id?: string | null;
  locationCity?: string | null;
  locationCountry?: string | null;
  locationCountryCode?: string | null;
  locationPostalCode?: string | null;
  locationState?: string | null;
  medium?: string | null;
  minimumPriceDollars?: number | null;
  provenance?: string | null;
  sessionID?: string | null;
  signature?: boolean | null;
  state?: ConsignmentSubmissionStateAggregation | null;
  title?: string | null;
  userEmail?: string | null;
  userName?: string | null;
  userPhone?: string | null;
  utmMedium?: string | null;
  utmSource?: string | null;
  utmTerm?: string | null;
  width?: string | null;
  year?: string | null;
};
export type UpdateConsignSubmissionMutation$variables = {
  input: UpdateSubmissionMutationInput;
};
export type UpdateConsignSubmissionMutation$data = {
  readonly updateConsignmentSubmission: {
    readonly consignmentSubmission: {
      readonly externalId: string;
    } | null;
  } | null;
};
export type UpdateConsignSubmissionMutation = {
  variables: UpdateConsignSubmissionMutation$variables;
  response: UpdateConsignSubmissionMutation$data;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "input"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "input",
    "variableName": "input"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "externalId",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "UpdateConsignSubmissionMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "UpdateSubmissionMutationPayload",
        "kind": "LinkedField",
        "name": "updateConsignmentSubmission",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "ConsignmentSubmission",
            "kind": "LinkedField",
            "name": "consignmentSubmission",
            "plural": false,
            "selections": [
              (v2/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "UpdateConsignSubmissionMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "UpdateSubmissionMutationPayload",
        "kind": "LinkedField",
        "name": "updateConsignmentSubmission",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "ConsignmentSubmission",
            "kind": "LinkedField",
            "name": "consignmentSubmission",
            "plural": false,
            "selections": [
              (v2/*: any*/),
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
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "daa097d48983ae6296403e4004d5da5a",
    "id": null,
    "metadata": {},
    "name": "UpdateConsignSubmissionMutation",
    "operationKind": "mutation",
    "text": "mutation UpdateConsignSubmissionMutation(\n  $input: UpdateSubmissionMutationInput!\n) {\n  updateConsignmentSubmission(input: $input) {\n    consignmentSubmission {\n      externalId\n      id\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "aa1efc52c252fc73cfdb2d17e30960b8";

export default node;
