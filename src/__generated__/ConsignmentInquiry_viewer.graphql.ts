/**
 * @generated SignedSource<<d2e4d67a8de86447f5cbf4b73466971b>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ConsignmentInquiry_viewer$data = {
  readonly staticContent: {
    readonly specialistBios: ReadonlyArray<{
      readonly email: string;
      readonly firstName: string;
      readonly name: string;
    }> | null | undefined;
  } | null | undefined;
  readonly " $fragmentType": "ConsignmentInquiry_viewer";
};
export type ConsignmentInquiry_viewer$key = {
  readonly " $data"?: ConsignmentInquiry_viewer$data;
  readonly " $fragmentSpreads": FragmentRefs<"ConsignmentInquiry_viewer">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ConsignmentInquiry_viewer",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "StaticContent",
      "kind": "LinkedField",
      "name": "staticContent",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "SpecialistBio",
          "kind": "LinkedField",
          "name": "specialistBios",
          "plural": true,
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "name",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "firstName",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "email",
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Viewer",
  "abstractKey": null
};

(node as any).hash = "3f2c6012a7b94403975aa688919d31dc";

export default node;
