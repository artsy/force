/**
 * @generated SignedSource<<4db31d7dabf63725125f8e41cbfe1534>>
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

(node as any).hash = "0aa04602f2167f41db8a004c61db3c60";

export default node;
