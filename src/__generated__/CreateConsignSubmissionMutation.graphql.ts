/**
 * @generated SignedSource<<d0a39fdcc25d5ae4871c2926caa2ecdc>>
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
  additionalInfo?: string | null | undefined;
  artistID: string;
  attributionClass?: ConsignmentAttributionClass | null | undefined;
  authenticityCertificate?: boolean | null | undefined;
  category?: ConsignmentSubmissionCategoryAggregation | null | undefined;
  clientMutationId?: string | null | undefined;
  coaByAuthenticatingBody?: boolean | null | undefined;
  coaByGallery?: boolean | null | undefined;
  currency?: string | null | undefined;
  depth?: string | null | undefined;
  dimensionsMetric?: string | null | undefined;
  edition?: boolean | null | undefined;
  editionNumber?: string | null | undefined;
  editionSize?: number | null | undefined;
  editionSizeFormatted?: string | null | undefined;
  height?: string | null | undefined;
  locationCity?: string | null | undefined;
  locationCountry?: string | null | undefined;
  locationCountryCode?: string | null | undefined;
  locationPostalCode?: string | null | undefined;
  locationState?: string | null | undefined;
  medium?: string | null | undefined;
  minimumPriceDollars?: number | null | undefined;
  myCollectionArtworkID?: string | null | undefined;
  provenance?: string | null | undefined;
  sessionID?: string | null | undefined;
  signature?: boolean | null | undefined;
  source?: ConsignmentSubmissionSource | null | undefined;
  sourceArtworkID?: string | null | undefined;
  state?: ConsignmentSubmissionStateAggregation | null | undefined;
  title?: string | null | undefined;
  userAgent?: string | null | undefined;
  userEmail?: string | null | undefined;
  userName?: string | null | undefined;
  userPhone?: string | null | undefined;
  utmMedium?: string | null | undefined;
  utmSource?: string | null | undefined;
  utmTerm?: string | null | undefined;
  width?: string | null | undefined;
  year?: string | null | undefined;
};
export type CreateConsignSubmissionMutation$variables = {
  input: CreateSubmissionMutationInput;
};
export type CreateConsignSubmissionMutation$data = {
  readonly createConsignmentSubmission: {
    readonly consignmentSubmission: {
      readonly externalId: string;
    } | null | undefined;
  } | null | undefined;
};
export type CreateConsignSubmissionMutation = {
  response: CreateConsignSubmissionMutation$data;
  variables: CreateConsignSubmissionMutation$variables;
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
