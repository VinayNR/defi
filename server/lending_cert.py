import os

class LendingCertificate(object):
    def __init__(self, pool_name, from_address, amount, timestamp):
        self.pool_name = pool_name
        self.from_address = from_address
        self.amount = amount
        self.timestamp = timestamp

    def __str__(self):
        return f"Account: {self.from_address}, Amount: {self.amount}, Time: {self.timestamp}"

    def __hash__(self):
        return hash((self.pool_name, self.from_address, self.amount, self.timestamp))
