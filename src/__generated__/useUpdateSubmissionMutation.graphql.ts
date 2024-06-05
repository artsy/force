/**
 * @generated SignedSource<<ec4c47a760afbf25cfffec824c630411>>
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
  additionalInfo?: string | null | undefined;
  artistID?: string | null | undefined;
  attributionClass?: ConsignmentAttributionClass | null | undefined;
  authenticityCertificate?: boolean | null | undefined;
  category?: ConsignmentSubmissionCategoryAggregation | null | undefined;
  clientMutationId?: string | null | undefined;
  currency?: string | null | undefined;
  depth?: string | null | undefined;
  dimensionsMetric?: string | null | undefined;
  edition?: boolean | null | undefined;
  editionNumber?: string | null | undefined;
  editionSize?: number | null | undefined;
  editionSizeFormatted?: string | null | undefined;
  externalId?: string | null | undefined;
  height?: string | null | undefined;
  id?: string | null | undefined;
  locationCity?: string | null | undefined;
  locationCountry?: string | null | undefined;
  locationCountryCode?: string | null | undefined;
  locationPostalCode?: string | null | undefined;
  locationState?: string | null | undefined;
  medium?: string | null | undefined;
  minimumPriceDollars?: number | null | undefined;
  provenance?: string | null | undefined;
  sessionID?: string | null | undefined;
  signature?: boolean | null | undefined;
  state?: ConsignmentSubmissionStateAggregation | null | undefined;
  title?: string | null | undefined;
  userEmail?: string | null | undefined;
  userName?: string | null | undefined;
  userPhone?: string | null | undefined;
  utmMedium?: string | null | undefined;
  utmSource?: string | null | undefined;
  utmTerm?: string | null | undefined;
  width?: string | null | undefined;
  year?: string | null | undefined;
};
export type useUpdateSubmissionMutation$variables = {
  input: UpdateSubmissionMutationInput;
};
export type useUpdateSubmissionMutation$data = {
  readonly updateConsignmentSubmission: {
    readonly consignmentSubmission: {
      readonly externalId: string;
    } | null | undefined;
  } | null | undefined;
};
export type useUpdateSubmissionMutation = {
  response: useUpdateSubmissionMutation$data;
  variables: useUpdateSubmissionMutation$variables;
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
    "name": "useUpdateSubmissionMutation",
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
    "name": "useUpdateSubmissionMutation",
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
    "cacheID": "9ad8d24001615e726de37b47ccd660bc",
    "id": null,
    "metadata": {},
    "name": "useUpdateSubmissionMutation",
    "operationKind": "mutation",
    "text": "mutation useUpdateSubmissionMutation(\n  $input: UpdateSubmissionMutationInput!\n) {\n  updateConsignmentSubmission(input: $input) {\n    consignmentSubmission {\n      externalId\n      id\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "bcc93c3a85d1fe3e59e693dca0eaa628";

export default node;
