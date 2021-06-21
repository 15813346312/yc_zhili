/**
 * @description: Login interface parameters
 */
export interface LoginParams {
  username: string;
  password: string;
  client_id: string;
  client_secret: string;
  grant_type: string;
}

export interface RoleInfo {
  roleName: string;
  value: string;
}

/**
 * @description: Login interface return value
 */
export interface LoginResultModel {
  userId: string | number;
  token: string;
  role: RoleInfo;
}

/**
 * @description: Get user information return value
 */
export interface GetUserInfoModel {
  roles: RoleInfo[];
  // 用户id
  userId: string | number;
  // 用户名
  username: string;
  // 真实名字
  realName: string;
  // 头像
  avatar: string;
  // 介绍
  desc?: string;
}

export interface UserPagedListInput {
  filter?: string;
}

export interface UserDto {
  extraProperties: any;
  id?: string;
  creationTime?: string;
  creatorId?: string;
  lastModificationTime?: string;
  lastModifierId?: string;
  isDeleted?: boolean;
  deleterId?: string;
  deletionTime?: string;
  tenantId?: string;
  userName: string;
  name: string;
  surname: string;
  email: string;
  emailConfirmed?: boolean;
  phoneNumber: string;
  phoneNumberConfirmed?: boolean;
  lockoutEnabled?: boolean;
  lockoutEnd: string;
  concurrencyStamp: string;
}
