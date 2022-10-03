/**
 * @generated SignedSource<<7cb72efd9c28e3c4c22815919600986d>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type ConsignmentAttributionClass = "LIMITED_EDITION" | "OPEN_EDITION" | "UNIQUE" | "UNKNOWN_EDITION" | "%future added value";
export type ConsignmentSubmissionCategoryAggregation = "ARCHITECTURE" | "DESIGN_DECORATIVE_ART" | "DRAWING_COLLAGE_OR_OTHER_WORK_ON_PAPER" | "FASHION_DESIGN_AND_WEARABLE_ART" | "INSTALLATION" | "JEWELRY" | "MIXED_MEDIA" | "OTHER" | "PAINTING" | "PERFORMANCE_ART" | "PHOTOGRAPHY" | "PRINT" | "SCULPTURE" | "TEXTILE_ARTS" | "VIDEO_FILM_ANIMATION" | "%future added value";
export type ConsignmentSubmissionSource = "ADMIN" | "APP_INBOUND" | "MY_COLLECTION" | "PARTNER" | "WEB_INBOUND" | "%future added value";
export type ConsignmentSubmissionStateAggregation = "APPROVED" | "CLOSED" | "DRAFT" | "HOLD" | "PUBLISHED" | "REJECTED" | "SUBMITTED" | "%future added value";
export type CreateSubmissionMutationInput = {
  additionalInfo?: string | null;
  artistID: string;
  attributionClass?: ConsignmentAttributionClass | null;
  authenticityCertificate?: boolean | null;
  category?: ConsignmentSubmissionCategoryAggregation | null;
  clientMutationId?: string | null;
  coaByAuthenticatingBody?: boolean | null;
  coaByGallery?: boolean | null;
  currency?: string | null;
  depth?: string | null;
  dimensionsMetric?: string | null;
  edition?: boolean | null;
  editionNumber?: string | null;
  editionSize?: number | null;
  editionSizeFormatted?: string | null;
  height?: string | null;
  locationCity?: string | null;
  locationCountry?: string | null;
  locationCountryCode?: string | null;
  locationPostalCode?: string | null;
  locationState?: string | null;
  medium?: string | null;
  minimumPriceDollars?: number | null;
  myCollectionArtworkID?: string | null;
  provenance?: string | null;
  sessionID?: string | null;
  signature?: boolean | null;
  source?: ConsignmentSubmissionSource | null;
  sourceArtworkID?: string | null;
  state?: ConsignmentSubmissionStateAggregation | null;
  title?: string | null;
  userAgent?: string | null;
  userEmail?: string | null;
  userName?: string | null;
  userPhone?: string | null;
  utmMedium?: string | null;
  utmSource?: string | null;
  utmTerm?: string | null;
  width?: string | null;
  year?: string | null;
};
export type CreateConsignSubmissionMutation$variables = {
  input: CreateSubmissionMutationInput;
};
export type CreateConsignSubmissionMutation$data = {
  readonly createConsignmentSubmission: {
    readonly consignmentSubmission: {
      readonly externalId: string;
    } | null;
  } | null;
};
export type CreateConsignSubmissionMutation = {
  variables: CreateConsignSubmissionMutation$variables;
  response: CreateConsignSubmissionMutation$data;
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
    "name": "CreateConsignSubmissionMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "CreateSubmissionMutationPayload",
        "kind": "LinkedField",
        "name": "createConsignmentSubmission",
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
    "name": "CreateConsignSubmissionMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "CreateSubmissionMutationPayload",
        "kind": "LinkedField",
        "name": "createConsignmentSubmission",
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
    "cacheID": "fd5e681e3324029e8cbd7a79a9fb08e6",
    "id": null,
    "metadata": {},
    "name": "CreateConsignSubmissionMutation",
    "operationKind": "mutation",
    "text": "mutation CreateConsignSubmissionMutation(\n  $input: CreateSubmissionMutationInput!\n) {\n  createConsignmentSubmission(input: $input) {\n    consignmentSubmission {\n      externalId\n      id\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "3594c743b90e28b37cf944e971ad8a33";

export default node;
